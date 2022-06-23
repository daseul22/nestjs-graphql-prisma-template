import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  getText() {
    return 'HI IM TEXT';
  }
}
