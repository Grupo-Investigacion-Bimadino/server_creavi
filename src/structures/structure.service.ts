import { Injectable } from '@nestjs/common';
import { CreateJvcDto } from './dto/create-jvc.dto';
import { UpdateJvcDto } from './dto/update-jvc.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Structure } from './schemas/structure.schema';

interface NewStructure {
  version: string;
  elements: Record<string, any>;
  added: Record<string, any>;
  modified: Record<string, any>;
  deleted: Record<string, any>;
  x: string;
  y: string;
  z: string;
}
@Injectable()
export class StructureService {
  constructor(
    @InjectModel(Structure.name)
    private readonly structureModel: Model<Structure>,
  ) {}

  async deepDiff(jsonA: any, jsonB: any) {
    const { added, modified, deleted } = this.compareObjects(jsonA, jsonB);
    return { added, modified, deleted };
  }

  compareObjects(o1: any, o2: any, path: string = '') {
    const added: Record<string, any> = {};
    const modified: Record<string, any> = {};
    const deleted: Record<string, any> = {};

    const processProperty = (key: string, value1: any, value2: any) => {
      const newPath = path ? `${path}.${key}` : key;
      if (
        typeof value1 === 'object' &&
        value1 &&
        typeof value2 === 'object' &&
        value2
      ) {
        const diff = this.compareObjects(value1, value2, newPath);
        Object.assign(added, diff.added);
        Object.assign(modified, diff.modified);
        Object.assign(deleted, diff.deleted);
      } else if (value1 !== value2) {
        modified[newPath] = { old: value1, new: value2 };
      }
    };

    for (const key in o1) {
      if (!(key in o2)) {
        deleted[path ? `${path}.${key}` : key] = o1[key];
      } else {
        processProperty(key, o1[key], o2[key]);
      }
    }

    for (const key in o2) {
      if (!(key in o1)) {
        added[path ? `${path}.${key}` : key] = o2[key];
      }
    }

    return { added, modified, deleted };
  }

  async create(newStructure: CreateJvcDto) {
    const resultStructure = await this.structureModel.create(newStructure);
    console.log('structure', resultStructure);
    return resultStructure;
  }

  findAll() {
    return `This action returns all jvc`;
  }

  findOne(id: string) {
    return `This action returns a #${id} jvc`;
  }

  update(id: string, updateDto: UpdateJvcDto) {
    const updateOps = { $set: updateDto };
    let structure = this.structureModel.findByIdAndUpdate(id, updateOps, {
      new: true,
    });
    return structure;
  }

  remove(id: string) {
    return `This action removes a #${id} jvc`;
  }
}
