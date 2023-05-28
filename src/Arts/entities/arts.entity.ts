import { Word } from 'src/words/entities/words.entity';
import {
  Column,
  Entity,
  IsNull,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('arts')
export class Art {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  type: string;
  @Column()
  name: string;
  @Column()
  author: string;
  @Column()
  topWord: string;
  @Column()
  frequency: number;
  @ManyToMany((type) => Word, (word) => word.arts)
  @JoinTable({
    name: 'word_art',
    joinColumn: { name: 'arts_id' },
    inverseJoinColumn: { name: 'words_id' },
  })
  words: Word[];
}
