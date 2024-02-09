import { ArrayMinSize, IsArray, IsOptional, IsString } from 'class-validator';

export class UpdateCategoryDto {
  @IsString()
  @IsOptional()
  description: string;

  @IsArray()
  @ArrayMinSize(1)
  @IsOptional()
  events: Array<EventDto>;
}

export class EventDto {
  name: string;
  operation: string;
  value: number;
}
