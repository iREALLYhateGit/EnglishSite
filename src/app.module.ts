import { Module } from '@nestjs/common';
import { WordsModule } from './Words/words.module';
import { IdiomsModule } from './Idioms/idioms.module';
import { ArtsModule } from './Arts/arts.module';
import { StudentModule } from 'src/students/students.module';
import { ProgressModule } from 'src/progress/progress.module';
import { DatasourceModule} from "src/datasource/datasource.module";
import { TypeOrmModule } from '@nestjs/typeorm';
import { Word } from './Words/entities/words.entity';
import { Art } from './Arts/entities/arts.entity';
import { Idiom } from './Idioms/entities/idioms.entity';

@Module({
  imports: [WordsModule,  ArtsModule, IdiomsModule, StudentModule, ProgressModule,  DatasourceModule, TypeOrmModule.forRoot({
    type: 'postgres', //тип подключаемой БД
    port: 2004, //порт
    username: 'postgres', //имя пользователя
    password: 'hangar123', //пароль
    host: 'localhost', //хост, в нашем случае БД развернута локально
    synchronize: true , //отключаем автосинхронизацию(в противном случае при каждом перезапуске наша БД будет создаваться заново)
    logging: 'all', //включим логирование для удобства отслеживания процессов
    //autoLoadEntities: true
    entities: [__dirname + '/../**/*.entity.{js,ts}'], //указываем путь к сущностям
    autoLoadEntities: true
  })
],
  controllers: [],
  providers: []
})
export class AppModule {}

//'dist/**/*.entity{.ts,.js}'
   