import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Version } from 'src/version/schemas/version.schema';

@Schema({ timestamps: true })
export class Structure extends Document {
  @Prop({ type: String, default: '1.0.0' })
  version: string;

  @Prop({ type: Object })
  elements: Record<string, any>;

  @Prop({ type: Object })
  added: Record<string, any>;

  @Prop({ type: Object })
  modified: Record<string, any>;

  @Prop({ type: Object })
  deleted: Record<string, any>;

  @Prop({ type: Number })
  x: number;

  @Prop({ type: Number })
  y: number;

  @Prop({ type: Number })
  z: number;

  @Prop({ type: Types.ObjectId, ref: 'Version' })
  versions: Version;
}

export const StructureSchema = SchemaFactory.createForClass(Structure);
