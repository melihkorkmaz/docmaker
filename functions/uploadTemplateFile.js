const AWS = require("aws-sdk");
const Multipart = require('lambda-multipart');
// const parser = require('lambda-multipart-parser');
const Busboy = require('busboy');
require('dotenv').config();

const s3 = new AWS.S3({
  accessKeyId: process.env.MY_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.MY_AWS_SECRET_ACCESS_KEY,
});

const parseMultipartFormData = async event => {
  return new Promise((resolve, reject) => {
    const parser = new Multipart(event);

    parser.on("finish", result => {
      console.log('asd', result.files)
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

const getContentType = (event) => {
  const contentType = event.headers['content-type']
  if (!contentType) {
      return event.headers['Content-Type'];
  }
  return contentType;
};

const uploadFileIntoS3 = async file => {
  const ext = getFileExtension(file);

  const options = {
    Bucket: "docmaker-templates",
    Key: `${file.name}.${ext}`,
    Body: file,
    ContentType: file.headers['content-type']
  };

  await s3.upload(options).promise();
};

const parser = (event) => new Promise((resolve, reject) => {
  const busboy = new Busboy({
      headers: {
          'content-type': getContentType(event)
      }
  });

  const result = {};

  busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
      file.on('data', data => {
          result.file = data;
      });

      file.on('end', () => {
          result.filename = filename;
          result.contentType = mimetype;
      });
  });

  busboy.on('field', (fieldname, value) => {

      result[fieldname] = value;
  });

  busboy.on('error', error => reject(error));
  busboy.on('finish', () => {
      event.body = result;
      resolve(event);
  });
  console.log('event.isBase64Encoded ', event.isBase64Encoded )
  busboy.write(event.body, event.isBase64Encoded ? 'base64' : 'binary');
  busboy.end();
});

exports.handler = async (event, context, callback) => {
  parser(event).then(() => {
    console.log('event', event.body.file);
  })
  // const { files } = await parseMultipartFormData(event);
  // const file = files[0];
  // const result = await parser.parse(event);
  // const file = result.files[0];
  // console.log('file', file);
  // console.log('file', file);
  // try {
  //   await uploadFileIntoS3(file);
    return {
      statusCode: 200      
    }
  // } catch (err) {
  //   console.log('err', err)
  //   return {
  //     statusCode: 500,
  //     body: JSON.stringify({ msg: err.message })
  //   }
  // }
}