const AWS = require("aws-sdk");
const Multipart = require('lambda-multipart');
const parser = require('lambda-multipart-parser');
const { uuid } = require('uuidv4');
const mammoth = require('mammoth');
const officeParser = require('officeparser');
var textract = require('textract');
var JSZip = require("jszip");



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
    Key: `${uuid()}.${ext}`,
    Body: file
  };

  await s3.upload(options).promise();
};

exports.handler = async (event, context, callback) => {
  const result = await parser.parse(event);
  // const { files } = await parseMultipartFormData(event);
  // const file = files[0];
  // // console.log('file', Buffer.isBuffer(file._readableState.buffer.tail.data));
  const file = result.files[0];

  var getParams = {
    Bucket: 'docmaker-templates', // your bucket name,
    Key: 'Brochure.docx' // path to the object you're looking for
  }

  s3.getObject(getParams, async (err, data) => {
    // Handle any error and exit
    if (err)
      console.log(err);

    let objectData = data.Body;
    const text = (await mammoth.extractRawText({ buffer: objectData }));
    const value = text.value.split('\\n').join('.');
    console.log('oo', value.match(/\<<(.*?)\>>/g).map(x => x.replace('<<', '').replace('>>', '')));
  });

  // const text = (await mammoth.extractRawText({ buffer: file.content }));
  // textract.fromBufferWithMime(file.contentType, file.content, function (err, text) {
  //   console.log('err', err);
  //   console.log('txt', text);
  // })


  return {
    statusCode: 200,
    body: 'text',
  }
  // try {
  //   await uploadFileIntoS3(file);
  //   return {
  //     statusCode: 200,
  //     body: JSON.stringify({ msg: 'OK' })
  //   }
  // } catch (err) {
  //   return {
  //     statusCode: 500,
  //     body: JSON.stringify({ msg: err.message })
  //   }
  // }

}