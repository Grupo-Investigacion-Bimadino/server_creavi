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
import { VersionService } from './version.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateVcDto } from './dto/create-vc.dto';
import { UpdateVcDto } from './dto/update-vc.dto';

@Controller('versions')
export class VersionController {
  constructor(private readonly versionService: VersionService) {}

  // @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Request() req, @Body() createVcDto: CreateVcDto) {
    const properties = createVcDto.properties;
    return await this.versionService.createVersion(
      createVcDto,
      req.user,
      properties,
    );
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateVcDto: UpdateVcDto) {
    return await this.versionService.updateVersion(id, updateVcDto);
  }

  @Get(':id')
  findAll(@Param('id') id: string) {
    return this.versionService.findAllComponentVersions(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.versionService.findOneComponentVersion(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.versionService.removeVersion(id);
  }
}
