import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { getMd5Str } from '../utils/utils';
// import { CreatePhotoDto } from '../photo/dto/create-photo.dto';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>, // 注入User实体类的Repository
    private readonly httpService: HttpService, // 注入httpService发送请求
  ) {}
  create(createUserDto: CreateUserDto) {
    return this.userRepository.save(createUserDto);
  }

  findAll() {
    return this.userRepository.find();
  }

  findOne(userid: string) {
    return this.userRepository
      .createQueryBuilder('user')
      .where('user.userid = :id', { id: userid })
      .getOne();
  }

  update(userid: number, updateUserDto: UpdateUserDto) {
    return this.userRepository.update(userid, updateUserDto);
  }

  remove(userid: number) {
    return this.userRepository.delete(userid);
  }

  async login(code: string): Promise<any> {
    // 登录获取openid
    const grant_type = 'authorization_code';
    console.log(code, 'code1');
    const appid = 'wxc8cc0c6924a7c203';
    const appSecret = '4d23c439a4e836ad3b2a28b40fcfa740';
    const url = `https://api.weixin.qq.com/sns/jscode2session?appid=${appid}&secret=${appSecret}&js_code=${code}&grant_type=${grant_type}`;
    // const url = `https://api.weixin.qq.com/cgi-bin/token?grant_type=${grant_type}&appid=${appid}&secret=${appSecret}`; // 替换为你的API URL
    const response = await this.httpService.get(url).toPromise();
    console.log(response.data, 'res');

    const createUserDto = new CreateUserDto();
    createUserDto.username = 'lsl';
    createUserDto.password = '123';
    createUserDto.openid = getMd5Str(response.data.openid);
    const exit = await this.userRepository.findOneBy({
      openid: createUserDto.openid,
    });
    console.log(createUserDto, 'createUserDto');
    if (!exit) {
      await this.userRepository.save(createUserDto);
    }
    return response.data;
  }

  async getUserList() {
    const res = await this.userRepository.createQueryBuilder('user').getMany();
    console.log(res, 'userList');
    return res;
  }
}
