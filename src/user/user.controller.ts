import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Param, 
  Delete, 
  Put, 
  BadRequestException 
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';

@Controller('users') // Alterado para plural, seguindo boas práticas REST
export class UserController {
  constructor(private readonly userService: UserService) {}

  // Listar todos os usuários
  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  // Buscar usuário pelo ID
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User> {
    if (!id || id.length !== 36) { // Validação básica para UUID
      throw new BadRequestException('Invalid user ID');
    }
    return this.userService.findOne(id);
  }

  @Get('email/:email')
  async findByEmail(@Param('email') email: string): Promise<User | undefined> {
    return this.userService.findByEmail(email);
  }

  // Criar novo usuário
  @Post()
  async create(@Body() user: Partial<User>): Promise<User> {
    if (!user.email || !user.password || !user.name) {
      throw new BadRequestException('Missing required fields: name, email, password');
    }
    return this.userService.create(user);
  }

  // Atualizar informações do usuário
  @Put(':id')
  async update(
    @Param('id') id: string, 
    @Body() user: Partial<User>,
  ): Promise<User> {
    if (!id || id.length !== 36) {
      throw new BadRequestException('Invalid user ID');
    }
    return this.userService.update(id, user);
  }

  // Remover usuário pelo ID
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<{ message: string }> {
    if (!id || id.length !== 36) {
      throw new BadRequestException('Invalid user ID');
    }
    await this.userService.remove(id);
    return { message: 'User successfully deleted' };
  }

  // Endpoint para autenticação
  @Post('login')
  async login(
    @Body('email') email: string, 
    @Body('password') password: string,
  ): Promise<{ message: string; user: User }> {
    if (!email || !password) {
      throw new BadRequestException('Missing email or password');
    }

    const user = await this.userService.validatePassword(email, password);
    if (!user) {
      throw new BadRequestException('Invalid email or password');
    }

    return { message: 'Login successful', user };
  }
}
