import { IdiomsService } from './idioms.service';
import { Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import { Idiom } from './entities/idioms.entity';
import { CreateIdiomDto } from './dto/IdiomDTO';
import { ApiTags } from '@nestjs/swagger';


@Controller('idioms')
export class IdiomsController {
  constructor(private readonly idiomsService: IdiomsService) {}
  @Get()
  findAll() {
    return this.idiomsService.findAll();
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.idiomsService.findOne(+id);
  }
  @Put(':id')
  update(@Param('id') id: string, @Body() updateVideo: Idiom) {
    return this.idiomsService.update(+id, updateVideo);
  }
  @Post()
  create(@Body() createIdiom: CreateIdiomDto) {
    return this.idiomsService.create(createIdiom);
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.idiomsService.remove(+id);
  }
}