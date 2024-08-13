import { Injectable } from '@nestjs/common';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { promises as fs } from 'fs';
import * as path from 'path';

@Injectable()
export class FilesService {
  private redisClient;

  constructor() {}
}
