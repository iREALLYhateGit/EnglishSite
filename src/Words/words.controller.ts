import { WordsService } from './words.service';
import { Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import { Word } from './entities/words.entity';
import { CreateWordDto } from './dto/WordDTO';
import { ApiOperation, ApiTags } from '@nestjs/swagger';


@Controller('words')
@ApiTags('Words') // Тег для документации

export class WordsController {
  constructor(private readonly wordsService: WordsService) {}
  @Get()
  findAll() {
    return this.wordsService.findAll();
  }
  @Get('incomplete')
  findIncomplete() {
    this.wordsService.findIncomplete();
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.wordsService.findOne(+id);
  }
  @Put(':id')
  update(@Param('id') id: string, @Body() updateAuthor: Word) {
    return this.wordsService.update(+id, updateAuthor);
  }
  @ApiOperation({ summary: 'Creation of word' }) 
  @Post()
  create(@Body() createWord: CreateWordDto) {
    return this.wordsService.create(createWord);
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.wordsService.remove(+id);
  }
}