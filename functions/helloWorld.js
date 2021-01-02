const AWS = require("aws-sdk");

const s3 = new AWS.S3({
  accessKeyId: process.env.MY_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.MY_AWS_SECRET_ACCESS_KEY,
});

exports.handler = async (event, context, callback) => {
  const params = {
    Bucket: "docmaker-templates",
    Key: `name-of-your-file.json`,
    Body: JSON.stringify({ hello: "world" }),
    ACL: "private",
    ContentEncoding: "utf8",
    ContentType: `application/json`,
  };

  try {
    const result = await s3.upload(params).promise();
    return { statusCode: 200, body: JSON.stringify(result) }
  } catch (err) {
    return { statusCode: 500, body: err.message }
  }
}