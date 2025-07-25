const REGION = "us-east-1";
const sesClient = new SESClient({
  region: REGION,
  Credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secreatAcessKey: process.env.AWS_SECRET_KEY,
  },
});

module.exports = { sesClient };
