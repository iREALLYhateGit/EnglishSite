import { Module } from "@nestjs/common";
import { WordsService} from "./words.service";
import { WordsController} from "./words.controller";
import { DatasourceModule} from "src/datasource/datasource.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Art } from "src/Arts/entities/arts.entity";
import { Idiom } from "src/Idioms/entities/idioms.entity";
import { Word } from "./entities/words.entity";


@Module({
    controllers: [WordsController],
    providers: [WordsService],
    imports: [
      DatasourceModule,
      TypeOrmModule.forFeature([Word, Art, Idiom]),],
  })
  export class WordsModule {}
  