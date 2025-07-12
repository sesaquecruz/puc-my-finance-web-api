import { Injectable, Logger, NestMiddleware } from '@nestjs/common';

import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger('HTTP');

  use(req: Request, res: Response, next: NextFunction): void {
    const startTime = process.hrtime();
    const { method, originalUrl } = req;

    res.on('finish', () => {
      const diff = process.hrtime(startTime);
      const elapsedTime = (diff[0] * 1e3 + diff[1] / 1e6).toFixed(3);

      const { statusCode } = res;

      this.logger.log(
        `${method}: ${originalUrl} -> ${statusCode} [${elapsedTime}ms]`,
      );
    });

    next();
  }
}
