const AWS = require("aws-sdk");
const Multipart = require('lambda-multipart');

const s3 = new AWS.S3({
  accessKeyId: process.env.MY_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.MY_AWS_SECRET_ACCESS_KEY,
});

const parseMultipartFormData = async event => {
  return new Promise((resolve, reject) => {
    const parser = new Multipart(event);

    parser.on("finish", result => {
      resolve({ fields: result.fields, files: result.files });
    });

    parser.on("error", error => {
      return reject(error);
    });
  });
};

const getFileExtension = file => {
  const headers = file["headers"];
  if (headers == null) {
    throw new Error(`Missing "headers" from request`);
  }

  const contentType = headers["content-type"];
  if (contentType == 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
    return "docx";
  }

  throw new Error('Unsupported file format!');
};

const uploadFileIntoS3 = async file => {
  const ext = getFileExtension(file);

  const options = {
    Bucket: "docmaker-templates",
    Key: `${file.name}.${ext}`,
    Body: file
  };

  await s3.upload(options).promise();
};

exports.handler = async (event, context, callback) => {
  const { files } = await parseMultipartFormData(event);
  const file = files[0];

  try {
    await uploadFileIntoS3(file);
    return {
      statusCode: 200,
      body: JSON.stringify({ status: true })
    }
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: err.message })
    }
  }
}