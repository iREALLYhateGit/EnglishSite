import { Injectable } from '@nestjs/common';
import { Word } from 'src/Words/entities/words.entity';
import { Idiom } from 'src/Idioms/entities/idioms.entity';
import { Art } from 'src/Arts/entities/arts.entity';

@Injectable()
export class DatasourceService {
  private words: Word[] = [];

  private idioms: Idiom[] = [];

  private arts: Art[] = [];

  getWords(): Word[] {
    return this.words;
  }
  getIdioms(): Idiom[] {
    return this.idioms;
  }
  getArts(): Art[] {
    return this.arts;
  }
}