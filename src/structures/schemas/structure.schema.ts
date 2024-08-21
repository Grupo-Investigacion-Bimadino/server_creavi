import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Version } from 'src/version/schemas/version.schema';

@Schema({ timestamps: true })
export class Structure extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Version', required: true })
  version: Version;

  @Prop({ type: Object, required: true })
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
}

export const StructureSchema = SchemaFactory.createForClass(Structure);
