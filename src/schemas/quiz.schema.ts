import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
export type CatDocument = HydratedDocument<Quiz>;

@Schema({ collection: 'questions' })
export class Quiz {
    @Prop({ type: String })
    name: string;

    @Prop({ type: String })
    area: string;

    @Prop({ type: Boolean })
    isActive: boolean;

    @Prop({ type: [{ name: String, correct: Boolean }] })
    opciones: { name: string; correct: boolean }[];
}

export const QuizSchema = SchemaFactory.createForClass(Quiz);