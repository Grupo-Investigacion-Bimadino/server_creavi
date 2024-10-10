import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ElementService } from './element.service';
import { CreateElementDto } from './dto/create-element.dto';
import { UpdateElementDto } from './dto/update-element.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import e from 'express';

@Controller('elements')
export class ElementController {
  constructor(private readonly elementService: ElementService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Request() req, @Body() createElementDto: CreateElementDto) {
    return this.elementService.create(createElementDto, req.user);
  }

  @Get()
  findAll() {
    return this.elementService.findAll();
  }

  @Get('/templates')
  findAllTemplates() {
    return this.elementService.findAllTemplates();
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.elementService.findOne(id);
  }

  @Get('name/:name')
  findOneByName(@Param('name') name: string) {
    return this.elementService.findOneByName(name);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateElementDto: UpdateElementDto) {
    return this.elementService.update(id, updateElementDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.elementService.remove(id);
  }
}
