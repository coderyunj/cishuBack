import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { generateUUID, getMd5Str } from '../utils/utils';
import { TokenService } from "../token/token.service";
// import { CreatePhotoDto } from '../photo/dto/create-photo.dto';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>, // 注入User实体类的Repository
    private readonly httpService: HttpService, // 注入httpService发送请求
    private readonly tokenService: TokenService,
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
    // const promise1 = new Promise((resolve, reject) => {
    //   console.log('promise1执行完毕');
    // });
    // const promise2 = new Promise((resolve, reject) => {
    //
    //   console.log('超出最大执行时间promise2执行完毕');
    // });
    // const res = await Promise.race([promise1, promise2]);

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
    createUserDto.username = `用户${generateUUID()}`;
    createUserDto.password = '123456';
    createUserDto.openid = getMd5Str(response.data.openid);
    // 查询用户信息
    let userInfo = await this.userRepository.findOneBy({
      openid: createUserDto.openid,
    });
    console.log(userInfo, 'exit');
    if (!userInfo) {
      // 存储用户信息
      userInfo = await this.userRepository.save(createUserDto);
    }
    const payload = {
      username: createUserDto.username,
      openid: createUserDto.openid,
    };
    console.log(payload, 'pay');
    // 生成 JWT token
    const token = await this.tokenService.generateToken(payload);
    return {
      code: 200,
      data: {
        userInfo,
        token,
      },
      message: '登录成功',
    };
  }

  async getUserList() {
    const res = await this.userRepository.createQueryBuilder('user').getMany();
    console.log(res, 'userList');
    return res;
  }
}
