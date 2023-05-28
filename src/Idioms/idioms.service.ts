import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Art } from 'src/Arts/entities/arts.entity';
import { DatasourceService } from 'src/datasource/datasource.service';
import { Idiom } from 'src/Idioms/entities/idioms.entity';
import { Word } from 'src/words/entities/words.entity';
import { In, Repository } from 'typeorm';
import { CreateIdiomDto } from './dto/IdiomDTO';
import { IncompleteIdiomDto } from './dto/incomplete-idiom';

@Injectable()
export class IdiomsService{
  constructor(
    @InjectRepository(Word)
    private readonly wordRepository: Repository<Word>, // "внедряем" репозиторий Word в сервис
    @InjectRepository(Idiom)
    private readonly idiomRepository: Repository<Idiom>, // "внедряем" репозиторий Idiom в сервис
    @InjectRepository(Art)
    private readonly artRepository: Repository<Art>, // "внедряем" репозиторий Art в сервис
  ) {}
  async create(idiomDto: CreateIdiomDto): Promise<Idiom>
 {
    //получаем объект CreateWordDto
    const idiom = this.idiomRepository.create(); //создаем объект Word из репозитория
    idiom.text = idiomDto.text; //заполняем поля объекта Word
    idiom.topic = idiomDto.topic;
    idiom.length = idiomDto.length;
    // const words = await this.wordRepository.findBy({
    //   //получаем массив Idiom по id
    //   id: In(idiomDto.words),
    // });
    // idiom.words = words;
    await this.idiomRepository.save(idiom); //сохраняем объект Word в БД
    return idiom; //возвращаем объект Word
  }

  findOne(id: number): Promise<Idiom> {
    // Promise<Word> - указывает, что функция возвращает объект Word в виде Promise (c асинхронного потока)
    return this.idiomRepository.findOne({
      //получаем объект Word по id
      where: { id }, //указываем условие поиска по id
      relations: { words: true}, //получаем связанные объекты
    });
  }

  async findAll(): Promise<Idiom[]> {
    const idioms = await this.idiomRepository.find({
      //получаем связанные объекты
      relations: {
        words: true
      },
    }); //получаем массив Word из БД
    return idioms; //возвращаем массив Word
  }
    
  async findIncomplete(): Promise<IncompleteIdiomDto[]> {
    const idioms = await this.idiomRepository.find(); //получаем массив Author из БД
    const incompleteIdioms: IncompleteIdiomDto[] = idioms.map((idiom) => {
      //преобразуем массив Word в массив IncompleteAuthorDto
      const incompleteIdiom = new IncompleteIdiomDto();
      incompleteIdiom.id = idiom.id;
      incompleteIdiom.text = idiom.text;
      incompleteIdiom.topic = idiom.topic;
      return incompleteIdiom;
    });
    return incompleteIdioms; //возвращаем массив IncompleteWordDto
  }
  async update(id: number, updatedIdiom: Idiom) {
    //получаем объект Word для обновления по id
    const idiom = await this.idiomRepository.findOne({ where: { id } }); //получаем объект Word по id из БД
    idiom.text = updatedIdiom.text; //обновляем поля объекта Word
    idiom.topic = updatedIdiom.topic;
    idiom.length = updatedIdiom.length;
    idiom.words = updatedIdiom.words;
    await this.idiomRepository.save(idiom); //сохраняем объект Word в БД
    return idiom; //возвращаем объект Word
  }
  remove(id: number) {
    this.idiomRepository.delete({ id }); //удаляем объект Word из БД
  }
}