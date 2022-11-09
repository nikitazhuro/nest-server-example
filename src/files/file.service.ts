import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { v4 } from 'uuid';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class FileService {
  async createFile(fileData: any): Promise<string> {
    try {
      const fileName = `${v4()}.jpg`;
      const filePath = path.resolve(__dirname, '..', 'static');
      if (!fs.existsSync(filePath)) {
        console.log(123);
        fs.mkdirSync(filePath, { recursive: true });
      }

      fs.writeFileSync(path.join(filePath, fileName), fileData.buffer);

      return fileName;
    } catch (error) {
      throw new HttpException('File error', HttpStatus.BAD_REQUEST);
    }
  }
}
