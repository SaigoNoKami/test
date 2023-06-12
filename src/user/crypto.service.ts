/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class CryptoService {
  async hash(password: string): Promise<string> {
    const salt = crypto.randomBytes(128).toString('base64');
    const hash = crypto.createHash('sha512').update(password).digest('hex');
    return hash + salt;
  }

  async compare(password: string, hash: string) {
    const pass_hash1 = crypto
      .createHash('sha512')
      .update(password)
      .digest('hex');
    const pass_hash2 = hash.slice(0, -172);
    return pass_hash1 === pass_hash2;
  }
}
