import { ApiProperty } from '@nestjs/swagger';
import { Art } from 'src/Arts/entities/arts.entity';
import { Idiom } from 'src/Idioms/entities/idioms.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('words') //указываем что это не просто клаcс, а сущность в рамках TypeOrm, в БД будет храниться как таблица
export class Word {
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @PrimaryGeneratedColumn() //колонка - идентификатор, значение генерируется автоматически
  id: number;
  @ApiProperty({ example: 'plate', description: 'Just add the word' })
  @Column({}) //колонка таблицы, сюда можно добавить большое количество параметров для БД, например тип, уникальность, триггер и т.д.
  name: string;
  @ApiProperty({ example: 'dishes', description: 'Topic' })
  @Column()
  topic: string;
  @ApiProperty({ example: 'noun', description: 'part of speech' })
  @Column()
  partOfSpeech: string;
  @ApiProperty({ example: 'тарелка', description: 'Translation' })
  @Column()
  translation: string;
  @ApiProperty({ example: 'A2', description: 'The difficulty level' })
  @Column()
  level: string;
  @ApiProperty({ example: '1.04', description: 'the rapidness in 1000 words' })
  @Column()
  rapidness: number;
  @ManyToMany((type) => Idiom, (idiom) => idiom.words) //Создадим связь многие ко многим с сущностью article и свяжем с полем words в статье
  @JoinTable({
    //join таблица с названием words_article
    name: 'words_idiom',
    joinColumn: { name: 'words_id' }, //для связи с идентификатором автора
    inverseJoinColumn: { name: 'idioms_id' }, //для связи с идентификатором статьи
  })
  idioms: Idiom[]; //объект, в котором будем автоматически получать все статьи автора
  @ManyToMany((type) => Art, (art) => art.words) //тоже самое для аффилиаций
  @JoinTable({
    name: 'words_art',
    joinColumn: { name: 'words_id' },
    inverseJoinColumn: { name: 'arts_id' },
  })
  arts: Art[];
}
