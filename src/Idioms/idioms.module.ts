import { Module } from "@nestjs/common";
import { IdiomsService} from "./idioms.service";
import { IdiomsController} from "./idioms.controller";
import { DatasourceModule} from "src/datasource/datasource.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Word } from "src/Words/entities/words.entity";
import { Idiom } from "./entities/idioms.entity";
import { Art } from "src/Arts/entities/arts.entity";


// @Module({
//     controllers: [IdiomsController],
//     providers: [IdiomsService],
//     imports: [DatasourceModule],
// })
// export class IdiomsModule{}

@Module({
    controllers: [IdiomsController],
    providers: [IdiomsService],
    imports: [
      DatasourceModule,
      TypeOrmModule.forFeature([Word, Idiom, Art]),
    ],
  })
  export class IdiomsModule {}
  