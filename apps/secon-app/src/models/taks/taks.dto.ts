import { ApiProperty } from '@nestjs/swagger';

export class TaskDTO {
  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  dateTimeCreated: string;
}
