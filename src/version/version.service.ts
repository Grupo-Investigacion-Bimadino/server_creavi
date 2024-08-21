import { Injectable } from '@nestjs/common';
import { CreateVcDto } from './dto/create-vc.dto';
import { UpdateVcDto } from './dto/update-vc.dto';
import { StructureService } from 'src/structures/structure.service';
import { HistoriesService } from 'src/histories/histories.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Version } from './schemas/version.schema';
import { Structure } from 'src/structures/schemas/structure.schema';

@Injectable()
export class VersionService {
  constructor(
    private readonly structureService: StructureService,
    private readonly historiesService: HistoriesService,
    @InjectModel(Version.name) private readonly versionModel: Model<Version>,
  ) {}

  async createVersion(elements: CreateVcDto) {
    try {
      const structureCreated = await this.structureService.create({ elements });
      const versionCreated = await this.versionModel.create({
        structure: structureCreated._id,
        version: '1.0.0',
      });

      const historiesCreated = await this.historiesService.create({
        actualVersion: versionCreated._id,
        versions: [versionCreated._id],
      });

      await this.structureService.update(structureCreated._id.toString(), {
        version: versionCreated._id,
      });

      await this.versionModel.findByIdAndUpdate(
        versionCreated._id,
        { $set: { histories: historiesCreated._id } },
        { new: true },
      );

      return { version: versionCreated._id, history: historiesCreated._id };
    } catch (error) {
      console.error('Error creating version:', error);
      throw new Error('Could not create version');
    }
  }

  async updateVersion(id: string, updateElements: UpdateVcDto) {
    try {
      const version = await this.versionModel
        .findById(id)
        .populate('structure')
        .exec();

      if (!version) {
        throw new Error('Version not found');
      }

      const structure = version.structure as Structure;
      const { elements } = structure;

      const { added, modified, deleted } = await this.structureService.deepDiff(
        elements,
        updateElements,
      );

      // Determina cuál eje debe incrementarse
      let { x, y, z } = structure;

      if (added.length > 0 || deleted.length > 0) {
        // Cambios significativos (Major)
        x += 1;
        y = 0;
        z = 0;
      } else if (modified.length > 0) {
        // Cambios menores (Minor)
        y += 1;
        z = 0;
      } else {
        // Cambios mínimos (Patch)
        z += 1;
      }

      // Crear nueva estructura con el versionamiento actualizado
      const structureUpdated = await this.structureService.create({
        elements: updateElements,
        added,
        modified,
        deleted,
        version: id,
        x,
        y,
        z,
      });

      // Actualizar el campo de estructura en la versión actual
      version.structure = structureUpdated;

      // Guardar la versión actualizada
      await version.save();

      // Retornar la versión actualizada y la estructura actualizada
      return { versionUpdated: version, structureUpdated };
    } catch (error) {
      console.error('Error updating version:', error);
      throw new Error('Could not update version');
    }
  }

  async findAllComponentVersions(id_component: string) {
    return `This action removes a # vc`;
  }

  async findOneComponentVersion(_id: string) {
    return `This action removes a # vc`;
  }

  removeVersion(id: string) {
    return `This action removes a # vc`;
  }
}
