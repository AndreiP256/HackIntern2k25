import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateUserDto } from './dto/createUser.dto';
import { User } from 'src/graphql/models/User';
import { UpdateUserDto } from './dto/updateUser.dto';
import * as bcrypt from 'bcryptjs';
import { Role } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(user: CreateUserDto): Promise<User> {
    const { email, password, ...userData } = user;
    const tryUser = await this.prisma.user.findUnique({
      where: { email: email },
    });

    if (tryUser) {
      throw new ConflictException(`User with email: ${email} allready exists`);
    }

    const encPassword = await bcrypt.hash(password, 10);

    return this.prisma.user.create({
      data: {
        ...userData,
        email,
        password: encPassword,
      },
    });
  }

  findAll() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        nume: true,
        prenume: true,
        email: true,
        role: true,
        timestamp: true,
      },
      orderBy: [
        {
          nume: 'asc',
        },
        {
          prenume: 'asc',
        },
      ],
    });
  }

  findOne(id: string) {
    return this.prisma.user.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        nume: true,
        prenume: true,
        email: true,
        role: true,
        timestamp: true,
      },
    });
  }

  findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });
  }


  update(id: string, user: UpdateUserDto) {
    return this.prisma.user.update({
      where: {
        id: id,
      },
      data: user,
      select: {
        id: true,
        nume: true,
        prenume: true,
        email: true,
        role: true,
        timestamp: true,
      },
    });
  }

  remove(id: string) {
    return this.prisma.user.delete({
      where: {
        id: id,
      },
    });
  }
}
