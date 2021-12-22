import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
    @Prop({
        required: true,
        unique: true
    })
    name: string;

    @Prop()
    password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);