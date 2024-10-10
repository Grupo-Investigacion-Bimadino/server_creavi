import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ElementService } from './element.service';
import { ElementController } from './element.controller';
import { ElementSchema } from './schemas/element.schema';
import { VersionModule } from 'src/version/version.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Element', schema: ElementSchema }]),
    VersionModule,
  ],
  controllers: [ElementController],
  providers: [ElementService],
})
export class ElementModule {}
