const { createLogger, transports, format } = require('winston');

const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp(),
    format.printf(({ timestamp, level, message, meta }) =>
      `${timestamp} [${level}] ${message} ${meta ? JSON.stringify(meta) : ''}`
    )
  ),
  transports: [new transports.Console()]
});

module.exports = logger;
