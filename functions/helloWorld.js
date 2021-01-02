const AWS = require("aws-sdk");
var Multipart = require('lambda-multipart');


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
  if (contentType == "image/jpeg") {
    return "jpg";
  }

  throw new Error(`Unsupported content type "${contentType}".`);
};

const uploadFileIntoS3 = async file => {
  const ext = getFileExtension(file);
  const options = {
    Bucket: "docmaker-templates",
    Key: `${uuidv4()}.${ext}`,
    Body: file
  };

  try {
    await s3.upload(options).promise();
  } catch (err) {
    console.error(err);
    throw err;
  }
};

exports.handler = async (event, context, callback) => {
  const { fields, files } = await parseMultipartFormData(event);
  await Promise.all(
    files.map(async file => {
      await uploadFileIntoS3(file);
    })
  );

  return {
    successCode: 200,
    body: JSON.stringify({ msg: 'OK' })
  }
  // const params = {
  //   Bucket: "docmaker-templates",
  //   Key: `name-of-your-file.json`,
  //   Body: JSON.stringify({ hello: "world" }),
  //   ACL: "private",
  //   ContentEncoding: "utf8",
  //   ContentType: `application/json`,
  // };

  // try {
  //   const result = await s3.upload(params).promise();
  //   return { statusCode: 200, body: JSON.stringify(result) }
  // } catch (err) {
  //   return { statusCode: 500, body: err.message }
  // }


}