import { ArtsService } from './arts.service';
import { Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import { Art } from './entities/arts.entity';
import { CreateArtDto } from './dto/ArtDTO';
import { ApiTags } from '@nestjs/swagger';


@Controller('arts')
export class ArtsController {
  constructor(private readonly artsService: ArtsService) {}
  @Get()
  findAll() {
    return this.artsService.findAll();
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.artsService.findOne(+id);
  }
  @Put(':id')
  update(@Param('id') id: string, @Body() updateAccount: Art) {
    return this.artsService.update(+id, updateAccount);
  }
  @Post()
  create(@Body() createArt: CreateArtDto) {
    return this.artsService.create(createArt);
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.artsService.remove(+id);
  }
}