import winston, { Logger } from 'winston';
import 'dotenv/config';
const {LOGGER_LEVEL} = process.env;
class WinstonLogger {
  private static instance: WinstonLogger;
  private logger: Logger;

  private constructor(serviceName: string, errorLogFile: string, combinedLogFile: string) {
    // Initialize the Winston logger with file and console transports
    this.logger = winston.createLogger({
      level: LOGGER_LEVEL,  // Set the default log level
      format: winston.format.combine(
        winston.format.timestamp(),  // Add timestamps to logs
        winston.format.json()  // Format logs as JSON
      ),
      defaultMeta: { service: serviceName },  // Use dynamic service name
      transports: [
        // Write error level logs to the dynamic error log file
        new winston.transports.File({ filename: errorLogFile, level: 'error' }),
        // Write all logs to the dynamic combined log file
        new winston.transports.File({ filename: combinedLogFile }),
      ],
    });

    // Add console transport for non-production environments
    if (process.env.NODE_ENV !== 'production') {
      this.logger.add(new winston.transports.Console({
        format: winston.format.simple(),  // Simple format for console logs
      }));
    }
  }

  // Singleton pattern to ensure a single instance of WinstonLogger
  public static getInstance(serviceName: string = 'fms-service', errorLogFile: string = 'fms-error.log', combinedLogFile: string = 'fms-combined.log'): WinstonLogger {
    if (!WinstonLogger.instance) {
      WinstonLogger.instance = new WinstonLogger(serviceName, errorLogFile, combinedLogFile);
    }
    return WinstonLogger.instance;
  }

  // Method to log an info message
  public info(message: string): void {
    this.logger.info(message);
  }

  // Method to log a warning message
  public warn(message: string): void {
    this.logger.warn(message);
  }

  // Method to log an error message
  public error(message: string, error?: Error): void {
    this.logger.error(message, error ? { stack: error.stack } : {});
  }

  // Method to log a debug message
  public debug(message: string): void {
    this.logger.debug(message);
  }

  // Method to handle uncaught exceptions and unhandled rejections
  public handleExceptions(): void {
    // Handle uncaught exceptions and log them
    this.logger.exceptions.handle(
      new winston.transports.File({ filename: 'exceptions.log' })
    );

    // Handle unhandled promise rejections and log them
    this.logger.rejections.handle(
      new winston.transports.File({ filename: 'rejections.log' })
    );
  }
}

// Usage of the WinstonLogger class

export default WinstonLogger;
