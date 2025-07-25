require("dotenv").config();

const FRONTEND_BASE_URL = process.env.FRONTEND_BASE_URL;
const DATABASE_CONNECTION_STRING = process.env.DATABASE_CONNECTION_STRING;
const PORT = process.env.PORT;

module.exports = { FRONTEND_BASE_URL, DATABASE_CONNECTION_STRING, PORT };
