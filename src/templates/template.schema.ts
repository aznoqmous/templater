import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';

export type TemplateDocument = Template & Document;

@Schema()
export class Template {
    _id: ObjectId;

    @Prop({
        required: true,
        unique: true,
        index: true
    })
    name: string;

    @Prop()
    content: string;

    @Prop({
        index: true
    })
    createdAt: Date;

    @Prop({
        index: true
    })
    updatedAt: Date
}

export const TemplateSchema = SchemaFactory.createForClass(Template);