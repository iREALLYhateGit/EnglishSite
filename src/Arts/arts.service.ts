import { HttpStatus, Injectable } from '@nestjs/common';
import { DatasourceService } from 'src/datasource/datasource.service';
import { Art } from 'src/Arts/entities/arts.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Word } from 'src/words/entities/words.entity';
import { Idiom } from 'src/Idioms/entities/idioms.entity';
import { Repository } from 'typeorm';
import { CreateArtDto } from './dto/ArtDTO';

@Injectable()
export class ArtsService{
  constructor(
    @InjectRepository(Word)
    private readonly wordRepository: Repository<Word>, // "внедряем" репозиторий Word в сервис
    @InjectRepository(Idiom)
    private readonly idiomRepository: Repository<Idiom>, // "внедряем" репозиторий Idiom в сервис
    @InjectRepository(Art)
    private readonly artRepository: Repository<Art>, // "внедряем" репозиторий Art в сервис
  ) {}
  async create(artDto: CreateArtDto): Promise<Art>
 {
    //получаем объект CreateWordDto
    const art = this.artRepository.create(); //создаем объект Word из репозитория
    art.name = artDto.name; //заполняем поля объекта Word
    art.author = artDto.author;
    art.type = "None";
    art.frequency = 0;
    art.topWord = artDto.topWord;
    await this.artRepository.save(art); //сохраняем объект Word в БД
    return art; //возвращаем объект Word
  }

  findOne(id: number): Promise<Art> {
    // Promise<Word> - указывает, что функция возвращает объект Word в виде Promise (c асинхронного потока)
    return this.artRepository.findOne({
      //получаем объект Word по id
      where: { id }, //указываем условие поиска по id
      relations: { words: true}, //получаем связанные объекты
    });
  }

  async findAll(): Promise<Art[]> {
    const arts = await this.artRepository.find({
      //получаем связанные объекты
      relations: {
        words: true
      },
    }); //получаем массив Word из БД
    return arts; //возвращаем массив Word
  }
    
  // async findIncomplete(): Promise<IncompleteArtDto[]> {
  //   const idioms = await this.idiomRepository.find(); //получаем массив Author из БД
  //   const incompleteIdioms: IncompleteIdiomDto[] = idioms.map((idiom) => {
  //     //преобразуем массив Word в массив IncompleteAuthorDto
  //     const incompleteIdiom = new IncompleteIdiomDto();
  //     incompleteIdiom.id = idiom.id;
  //     incompleteIdiom.text = idiom.text;
  //     incompleteIdiom.topic = idiom.topic;
  //     return incompleteIdiom;
  //   });
  //   return incompleteIdioms; //возвращаем массив IncompleteWordDto
  // }
  async update(id: number, updatedArt: Art) {
    //получаем объект Word для обновления по id
    const art = await this.artRepository.findOne({ where: { id } }); //получаем объект Word по id из БД
    art.type = updatedArt.type; //обновляем поля объекта Word
    art.name = updatedArt.name;
    art.author = updatedArt.author;
    art.topWord = updatedArt.topWord;
    art.frequency = updatedArt.frequency;
    await this.artRepository.save(art); //сохраняем объект Word в БД
    return art; //возвращаем объект Word
  }
  remove(id: number) {
    this.artRepository.delete({ id }); //удаляем объект Word из БД
  }
    
}