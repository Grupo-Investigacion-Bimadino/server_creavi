import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateElementDto } from './dto/create-element.dto';
import { UpdateElementDto } from './dto/update-element.dto';
import { Model, ObjectId } from 'mongoose';
import { Element } from './schemas/element.schema';
import { VersionService } from 'src/version/version.service';
import { CreateVcDto } from 'src/version/dto/create-vc.dto';
import { User } from 'src/auth/schemas/user.schema';
import { Types } from 'mongoose';

@Injectable()
export class ElementService {
  constructor(
    @InjectModel(Element.name) private elementModel: Model<Element>,
    private readonly versionService: VersionService,
  ) {}

  async create(createElementDto: CreateElementDto, user: User) {
    // create element

    const element = new this.elementModel(createElementDto);
    const newElement = await element.save();
    let id = newElement._id as string;

    // create version
    console.log('newElement', newElement);
    const structure = newElement?.structure as CreateVcDto;
    const properties = newElement?.properties as any;
    const structureVersion = await this.versionService.createVersion(
      structure,
      user,
      properties,
    );

    // update element add version to versions array ids, update structure id
    const versionObjectId = new Types.ObjectId(structureVersion.version);
    const structureObjectId = new Types.ObjectId(structureVersion.structure);

    newElement.versions.push(versionObjectId);
    newElement.structure = structureObjectId;

    await this.elementModel.findByIdAndUpdate(id, newElement, { new: true });
    console.log('newElement', newElement);
    return newElement;
  }

  async findAll() {
    const elements = await this.elementModel
      .find({ type: { $ne: 'template' } })
      .exec();
    return elements;
  }

  async findAllTemplates() {
    const elements = await this.elementModel.find({ type: 'template' }).exec();
    return elements;
  }

  async findOneByName(name) {
    const element = await this.elementModel.findOne({ name }).exec();
    return element;
  }

  async findOne(id: string) {
    const element = await this.elementModel.findById(id).exec();
    return element;
  }

  async update(id: string, updateElementDto: UpdateElementDto) {
    /*const structure = updateElementDto.structure as CreateVcDto;
    const structureVersion = await this.versionService.updateVersion(
      id,
      structure,
    );

    console.log('structureVersion', structureVersion);
    /*
    const versionObjectId = new Types.ObjectId(structureVersion.version);
    const structureObjectId = new Types.ObjectId(structureVersion.structure);

    updateElementDto.versions.push(versionObjectId);
    updateElementDto.structure = structureObjectId;
    */

    const updatedElement = await this.elementModel.findByIdAndUpdate(
      id,
      updateElementDto as any,
      { new: true },
    );
    return updatedElement;
  }

  async remove(id: string) {
    const element = await this.elementModel.findByIdAndDelete(id);
    return element;
  }
}
