import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
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

  findOne(id: number) {
    return this.userRepository.findOneBy({ id });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userRepository.update(id, updateUserDto);
  }

  remove(id: number) {
    return this.userRepository.delete(id);
  }

  async login(code: string): Promise<any> {
    const grant_type = 'authorization_code';
    console.log(code, 'code1');
    const appid = 'wxc8cc0c6924a7c203';
    const appSecret = '4d23c439a4e836ad3b2a28b40fcfa740';
    const url = `https://api.weixin.qq.com/sns/jscode2session?appid=${appid}&secret=${appSecret}&js_code=${code}&grant_type=${grant_type}`;
    // const url = `https://api.weixin.qq.com/cgi-bin/token?grant_type=${grant_type}&appid=${appid}&secret=${appSecret}`; // 替换为你的API URL
    const response = await this.httpService.get(url).toPromise();
    console.log(response.data, 'res');
    return response.data;
  }
}
