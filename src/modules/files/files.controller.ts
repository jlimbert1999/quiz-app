import {
  Controller,
  Param,
  Post,
  Get,
  Res,
  UploadedFiles,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Response } from 'express';

import { fileFilter, fileNamer } from './helpers';
import { FilesService } from './files.service';

const MAX_FILE_SIZE: number = 2 * 1024 * 1024 * 1024;
@Controller('files')
export class FilesController {
  constructor(private fileService: FilesService) {}

  @Post('question')
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: fileFilter,
      limits: {
        fileSize: MAX_FILE_SIZE,
      },
      storage: diskStorage({
        destination: './static/img',
        filename: fileNamer,
      }),
    }),
  )
  uploadQuestionImage(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('Make sure that the file is an image');
    }
    return { file: file.filename };
  }

  @Get('question/:imageName')
  findQuestionImage(
    @Res() res: Response,
    @Param('imageName') imageName: string,
  ) {
    const path = this.fileService.getStaticQuestionImage(imageName);
    res.sendFile(path);
  }
}
