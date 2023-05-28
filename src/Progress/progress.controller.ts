import { ProgressService } from './progress.service';
import { Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import { Progress } from './entities/progress.entity';


@Controller('progress')
export class ProgressController {
  constructor(private readonly progressService: ProgressService) {}
  @Get()
  findAll() {
    return this.progressService.findAll();
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.progressService.findOne(+id);
  }
  @Put(':id')
  update(@Param('id') id: string, @Body() updateProgress: Progress) {
    return this.progressService.update(+id, updateProgress);
  }
  @Post()
  create(@Body() createProgress: Progress) {
    return this.progressService.createProgress(createProgress);
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.progressService.remove(+id);
  }
}