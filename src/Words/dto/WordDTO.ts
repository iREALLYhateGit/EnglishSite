import { ApiProperty } from "@nestjs/swagger";

export class CreateWordDto {
  @ApiProperty({ example: 'plate', description: 'Just a word' })
  name: string;
  @ApiProperty({ example: 'dishes', description: 'topic' })
  topic: string;
  @ApiProperty({ example: 'тарелка', description: 'translation' })
  translation: string;
}
