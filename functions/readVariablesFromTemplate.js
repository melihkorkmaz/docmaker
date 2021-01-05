const AWS = require("aws-sdk");

const s3 = new AWS.S3({
  accessKeyId: process.env.MY_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.MY_AWS_SECRET_ACCESS_KEY,
});

exports.handler = async (event, context, callback) => {
  var getParams = {
    Bucket: 'docmaker-templates', // your bucket name,
    Key: 'Brochure.docx' // path to the object you're looking for
  }

}