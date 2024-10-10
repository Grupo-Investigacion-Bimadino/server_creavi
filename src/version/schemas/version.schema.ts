import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Structure } from 'src/structures/schemas/structure.schema';
import { Histories } from 'src/histories/schemas/histories.schema';
import { User } from 'src/auth/schemas/user.schema';

@Schema({ timestamps: true })
export class Version extends Document {
  @Prop({ type: String, default: 'No name' })
  name: string;

  @Prop({ required: true })
  version: string;

  @Prop({ type: Types.ObjectId, ref: 'version_idersion' })
  version_id: Version;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  author: User;

  @Prop({ type: Object })
  properties: Record<string, any>;

  @Prop({ type: Types.ObjectId, ref: 'Structure' })
  structure: Structure;

  @Prop({ type: Types.ObjectId, ref: 'Version', default: null })
  nextVersion: Version;

  @Prop({ type: Types.ObjectId, ref: 'Version', default: null })
  prevVersion: Version;

  @Prop({ type: String, default: 'No description' })
  description: string;

  @Prop({ type: String, default: 'No features' })
  features: string;

  /*@Prop({ type: Types.ObjectId, ref: 'Histories' })
  histories: Histories;*/
}

export const VersionSchema = SchemaFactory.createForClass(Version);
