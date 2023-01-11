import { IsArray, IsNotEmpty } from 'class-validator';
export class DeleteManyUserDto {
  @IsNotEmpty()
  @IsArray()
  ids: string[];
}
