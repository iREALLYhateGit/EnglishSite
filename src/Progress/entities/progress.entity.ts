import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Student } from 'src/students/entities/students.entity';

@Entity()
export class Progress {
  @PrimaryGeneratedColumn()
  progress_id: number;

  @Column()
  subject: string;

  @Column()
  score: number;

  @ManyToOne((student_id: number) => Student, student => student.progress)
  student: Student;
}