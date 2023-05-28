import { Module } from "@nestjs/common";
import { StudentService} from "./students.service";
import { StudentController} from "./students.controller";
import { DatasourceModule} from "src/datasource/datasource.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Student } from 'src/students/entities/students.entity';
import { Progress } from 'src/progress/entities/progress.entity';

@Module({
    controllers: [StudentController],
    providers: [StudentService],
    imports: [
      DatasourceModule,
      TypeOrmModule.forFeature([Student, Progress]),
    ],
  })
  export class StudentModule {}