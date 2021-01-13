const AWS = require("aws-sdk");
const mammoth = require('mammoth');
require('dotenv').config();

var s3 = new AWS.S3({
  accessKeyId: process.env.MY_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.MY_AWS_SECRET_ACCESS_KEY,
});

const getDocument = (params) => {
  var getParams = {
    Bucket: 'docmaker-templates', // your bucket name,
    Key: `${params.tenantId}/${params.templateId}.docx` // path to the object you're looking for
  };

  return new Promise((resolve, reject) => {
    s3.getObject(getParams, async (err, data) => {
      if (err) {
        return reject(err);
      }

      const objectData = data && data.Body;        
      resolve(objectData);
    });
  });
}


exports.handler = async (event, context, callback) => {
  try {
    const params = JSON.parse(event.body);
    const objectData = await getDocument(params);
    const text = await mammoth.extractRawText({ buffer: objectData });
    const value = text.value.split('\\n').join('.');
    const parameters = value.match(/\<<(.*?)\>>/g).map(x => x.replace('<<', '').replace('>>', '')) || [];
    console.log(parameters)

    return { 
      statusCode: 200,
      body: JSON.stringify(parameters)
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: err.message })
    }   
  }
}