import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Art } from 'src/Arts/entities/arts.entity';
import { DatasourceService } from 'src/datasource/datasource.service';
import { Idiom } from 'src/Idioms/entities/idioms.entity';
import { Word } from 'src/Words/entities/words.entity';
import { In, Repository } from 'typeorm';
import { CreateWordDto } from './dto/WordDTO';
import { IncompleteWordDto } from './dto/incomplete-word.dto';

@Injectable()
export class WordsService{
    constructor(
      @InjectRepository(Word)
      private readonly wordRepository: Repository<Word>, // "внедряем" репозиторий Word в сервис
      @InjectRepository(Idiom)
      private readonly idiomRepository: Repository<Idiom>, // "внедряем" репозиторий Idiom в сервис
      @InjectRepository(Art)
      private readonly artRepository: Repository<Art>, // "внедряем" репозиторий Art в сервис
    ) {}
  
    async create(wordDto: CreateWordDto): Promise<Word>
 {
    //получаем объект CreateWordDto
    const word = this.wordRepository.create(); //создаем объект Word из репозитория
    word.name = wordDto.name; //заполняем поля объекта Word
    word.translation = wordDto.translation;
    word.topic = wordDto.topic;
    // const idioms = await this.idiomRepository.findBy({
    //   //получаем массив Idiom по id
    //   id: In(wordDto.idioms),
    // });
    word.partOfSpeech = "None";
    word.rapidness = 0;
    word.level = "None";
    //word.idioms = idioms;
    await this.wordRepository.save(word); //сохраняем объект Word в БД
    return word; //возвращаем объект Word
  }

  findOne(id: number): Promise<Word> {
    // Promise<Word> - указывает, что функция возвращает объект Word в виде Promise (c асинхронного потока)
    return this.wordRepository.findOne({
      //получаем объект Word по id
      where: { id }, //указываем условие поиска по id
      relations: { idioms: true, arts: true }, //получаем связанные объекты
    });
  }

  async findAll(): Promise<Word[]> {
    const words = await this.wordRepository.find({
      //получаем связанные объекты
      relations: {
        idioms: true,
        arts: true,
      },
    }); //получаем массив Word из БД
    return words; //возвращаем массив Word
  }
    
  async findIncomplete(): Promise<IncompleteWordDto[]> {
    const words = await this.wordRepository.find(); //получаем массив Author из БД
    const incompleteWords: IncompleteWordDto[] = words.map((word) => {
      //преобразуем массив Word в массив IncompleteAuthorDto
      const incompleteWord = new IncompleteWordDto();
      incompleteWord.id = word.id;
      incompleteWord.name = word.name;
      incompleteWord.topic = word.topic;
      return incompleteWord;
    });
    return incompleteWords; //возвращаем массив IncompleteWordDto
  }
  async update(id: number, updatedWord: Word) {
    //получаем объект Word для обновления по id
    const word = await this.wordRepository.findOne({ where: { id } }); //получаем объект Word по id из БД
    word.name = updatedWord.name; //обновляем поля объекта Word
    word.topic = updatedWord.topic;
    word.translation = updatedWord.translation;
    word.partOfSpeech = updatedWord.partOfSpeech;
    word.level = updatedWord.level;
    word.rapidness = updatedWord.rapidness;
    word.idioms = updatedWord.idioms;
    word.arts = updatedWord.arts;
    await this.wordRepository.save(word); //сохраняем объект Word в БД
    return word; //возвращаем объект Word
  }
  remove(id: number) {
    this.wordRepository.delete({ id }); //удаляем объект Word из БД
  }
}