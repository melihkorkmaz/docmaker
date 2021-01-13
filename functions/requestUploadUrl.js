const AWS = require("aws-sdk");
require('dotenv').config();

AWS.config.update({
  accessKeyId: process.env.MY_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.MY_AWS_SECRET_ACCESS_KEY,
});

var s3 = new AWS.S3({
  endpoint: new AWS.Endpoint('https://docmaker-templates.s3.eu-central-1.amazonaws.com'),
  s3ForcePathStyle: true,
  region: 'eu-central-1',
  signatureVersion: 'v4'
});

const createUrl = (params) => {
  return new Promise((resolve, reject) => {
    s3.getSignedUrl('putObject', params, (err, url) => {
      if (err) {
        return reject(err);
      }
  
      return resolve(url);
    });
  })
}


exports.handler = async (event, context) => {
  var params = JSON.parse(event.body);

  const s3Params = {
    Bucket: params.tenantId,
    Key: params.name,
    Expires: 60,
    // ContentType: params.type,
    // ACL: 'public-read',
  };

  try {
    const url = await createUrl(s3Params);

    return {
      statusCode: 200,
      body: JSON.stringify({ url })
    }
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: err.message })
    }    
  }
}