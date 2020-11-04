import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class AuthorizationMiddleware implements NestMiddleware {
  constructor() {}
  async use(req: Request, res: Response, next: Function) {
    console.log(req);
    console.log(res);
    next();
  }
}
