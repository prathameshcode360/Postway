// import fs from "fs";
import winston from "winston";
// const fsPromise = fs.promises;

// async function log(logData) {
//   try {
//     logData = `\n ${new Date().toString()}-${logData}`;
//     await fsPromise.appendFile("log.txt", logData);
//   } catch (error) {
//     console.log(error);
//   }
// }

const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  defaultMeta: { service: "request-logging" },
  transports: [new winston.transports.File({ filename: "logs.txt" })],
});

function loggerMiddleware(req, res, next) {
  const logData = `${req.method} ${req.originalUrl} - Body: ${JSON.stringify(
    req.body
  )}`;
  logger.info(logData);
  next();
}

export default loggerMiddleware;
