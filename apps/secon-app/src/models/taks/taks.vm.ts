import { ApiProperty } from '@nestjs/swagger';

export class TaskVM {
  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  dateTimeCreated: string;
}
