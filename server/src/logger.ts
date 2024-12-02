import { Service } from "typedi";
import pino from "pino";
import pretty from "pino-pretty";

const logger = pino(pretty());

@Service()
export class Logger {
  log(...args: any[]) {
    logger.info(args);
  }

  error(...args: any[]) {
    logger.error(args);
  }
}
