import { IsOptional, IsString } from 'class-validator';
import { PaginationParamsDto } from 'src/modules/common';

export class FilterQuestionsDto extends PaginationParamsDto {
  @IsString()
  @IsOptional()
  group?: string;

  @IsString()
  @IsOptional()
  term?: string;
}
