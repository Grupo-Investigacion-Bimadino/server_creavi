import { Module } from '@nestjs/common';
import { VersionService } from './version.service';
import { VersionController } from './version.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { VersionSchema } from './schemas/version.schema';
import { StructureModule } from 'src/structures/structure.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Version', schema: VersionSchema }]),
    StructureModule,
  ],
  controllers: [VersionController],
  providers: [VersionService],
  exports: [VersionService],
})
export class VersionModule {}
