import { Module } from "@nestjs/common";
import { ProgressService} from "./progress.service";
import { ProgressController} from "./progress.controller";
import { DatasourceModule} from "src/datasource/datasource.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Student } from 'src/students/entities/students.entity';
import { Progress } from 'src/progress/entities/progress.entity';

@Module({
    controllers: [ProgressController],
    providers: [ProgressService],
    imports: [
      DatasourceModule,
      TypeOrmModule.forFeature([Student, Progress]),
    ],
  })
  export class ProgressModule {}