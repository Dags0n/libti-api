import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // Listar todos os usuários
  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  // Buscar um único usuário pelo ID
  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  // Buscar usuário pelo e-mail
  async findByEmail(email: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { email } });
  }

  // Criar novo usuário
  async create(user: Partial<User>): Promise<User> {
    if (await this.findByEmail(user.email)) {
      throw new BadRequestException('Email already in use');
    }

    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(user.password, salt);

    const newUser = this.userRepository.create(user);
    return this.userRepository.save(newUser);
  }

  // Atualizar um usuário
  async update(id: string, user: Partial<User>): Promise<User> {
    const existingUser = await this.findOne(id);

    if (user.password) {
      const salt = await bcrypt.genSalt();
      user.password = await bcrypt.hash(user.password, salt);
    }

    const updatedUser = { ...existingUser, ...user };
    return this.userRepository.save(updatedUser);
  }

  // Remover um usuário
  async remove(id: string): Promise<void> {
    const user = await this.findOne(id);
    await this.userRepository.remove(user);
  }

  // Verificar se a senha fornecida é válida
  async validatePassword(email: string, password: string): Promise<User | null> {
    const user = await this.findByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    return null;
  }
}
