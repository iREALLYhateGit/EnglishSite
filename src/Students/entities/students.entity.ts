import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Progress } from 'src/progress/entities/progress.entity';

@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  student_id: number;

  @Column()
  student_name: string;

  @Column()
  student_age: number;

  @Column()
  student_grade: string;

  @OneToMany(() => Progress, progress => progress.student)
  progress: Progress[];
}