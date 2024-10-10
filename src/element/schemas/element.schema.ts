import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { StructureModule } from 'src/structures/structure.module';

@Schema({ timestamps: true })
export class Element extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  version: string;

  @Prop()
  type: string;

  @Prop({ type: Object })
  properties: Record<string, any>;

  @Prop({ type: Object })
  data: Record<string, any>;

  @Prop({ type: Types.ObjectId, ref: 'Structure' })
  structure: StructureModule;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  createdBy: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Branch' })
  mainBranch: Types.ObjectId;

  @Prop({ type: [Types.ObjectId], ref: 'Branch' })
  versions: Types.ObjectId[];

  @Prop({ type: String })
  category: string;

  @Prop({ type: String })
  label: string;
}

export const ElementSchema = SchemaFactory.createForClass(Element);
