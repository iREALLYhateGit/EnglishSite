
// export class Idiom{
//     id: number;
//     text: string;
//     topic: string;
//     wordsId: number;
//     length: number;
// }
import { Word } from 'src/words/entities/words.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('idioms')
export class Idiom {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  text: string;
  @Column()
  topic: string;
  @Column()
  length: number;
  @ManyToMany((type) => Word, (word) => word.idioms)
  @JoinTable({
    name: 'word_idiom',
    joinColumn: { name: 'idioms_id' },
    inverseJoinColumn: { name: 'words_id' },
  })
  words: Word[];
}
