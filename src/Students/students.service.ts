import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from 'src/students/entities/students.entity';
import { Progress } from 'src/progress/entities/progress.entity';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
    @InjectRepository(Progress)
    private progressRepository: Repository<Progress>,
  ) {}

  async createStudent(studentData: Partial<Student>): Promise<Student> {
    const student = this.studentRepository.create(studentData);
    return this.studentRepository.save(student);
  }

  findOne(student_id: number): Promise<Student> {
    return this.studentRepository.findOne({
      where: { student_id }, 
      relations: { progress: true},
    });
  }

  async findAll(): Promise<Student[]> {
    const students = await this.studentRepository.find({
      relations: {
        progress: true
      },
    });
    return students;
  }

  async update(student_id: number, updatedStudent: Student) {
    const student = await this.studentRepository.findOne({ where: { student_id } });
    student.student_name = updatedStudent.student_name;
    student.student_age = updatedStudent.student_age;
    student.student_grade = updatedStudent.student_grade;
    await this.studentRepository.save(student);
    return student;
  }
  remove(student_id: number) {
    this.studentRepository.delete({ student_id });
  }
}