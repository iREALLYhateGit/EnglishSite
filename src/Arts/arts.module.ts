import { Module } from "@nestjs/common";
import { ArtsService} from "./arts.service";
import { ArtsController} from "./arts.controller";
import { DatasourceModule} from "src/datasource/datasource.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Word } from "src/Words/entities/words.entity";
import { Idiom } from "src/Idioms/entities/idioms.entity";
import { Art } from "./entities/arts.entity";

@Module({
    controllers: [ArtsController],
    providers: [ArtsService],
    imports: [
      DatasourceModule,
      TypeOrmModule.forFeature([Word, Idiom, Art]),
    ],
  })
  export class ArtsModule {}
  