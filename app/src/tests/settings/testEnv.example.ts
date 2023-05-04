process.env.BACKEND_PORT = 5001;
process.env.DATABASE_URL = ""; //fe. mongodb://127.0.0.1:27017/testdb
process.env.COOKIE_SECRET = ""; //fe. 32 bytes hex string:
//require("crypto").randomBytes(32).toString('hex')

process.env.JWT_SECRET_KEY = ""; //fe. 32 bytes hex string:
//require("crypto").randomBytes(32).toString('hex')
process.env.NODE_ENV = "test";
