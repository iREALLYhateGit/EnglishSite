import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from 'src/students/entities/students.entity';
import { Progress } from 'src/progress/entities/progress.entity';

@Injectable()
export class ProgressService {
  constructor(
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
    @InjectRepository(Progress)
    private progressRepository: Repository<Progress>,
  ) {}

  async createProgress(progressData: Partial<Progress>): Promise<Progress> {
    const progress = this.progressRepository.create(progressData);
    return this.progressRepository.save(progress);
  }
  
  findOne(progress_id: number): Promise<Progress> {
    return this.progressRepository.findOne({
      where: { progress_id }, 
      relations: { student: true},
    });
  }

  async findAll(): Promise<Progress[]> {
    const progress = await this.progressRepository.find({
      relations: {
        student: true
      },
    });
    return progress;
  }

  async update(progress_id: number, updatedProgress: Progress) {
    const progress = await this.progressRepository.findOne({ where: { progress_id } });
    progress.subject = updatedProgress.subject;
    progress.score = updatedProgress.score;
    await this.progressRepository.save(progress);
    return progress;
  }
  remove(progress_id: number) {
    this.progressRepository.delete({ progress_id });
  }
}