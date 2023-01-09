import { Injectable } from '@nestjs/common';
import {HealtCheckStatus} from "./commun/interfaces/healtcheck.interface";

@Injectable()
export class AppService {
  getHello(currnetUser): HealtCheckStatus {
    return {status: "UP",currnetUser};
  }
}
