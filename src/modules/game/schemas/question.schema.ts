import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ _id: false })
class QuestionOption extends Document {
  @Prop({
    type: String,
    required: true,
  })
  text: string;

  @Prop({ type: String })
  imageUrl?: string;

  @Prop({ type: Boolean, required: true })
  isCorrect: boolean;
}
const QuestionOptionSchema = SchemaFactory.createForClass(QuestionOption);

@Schema()
export class Question {
  @Prop({ type: String, required: true })
  text: string;

  @Prop({ type: String, required: true })
  group: string;

  @Prop({ type: String })
  imageUrl?: string;

  @Prop({ type: Boolean, default: true })
  isActive: boolean;

  @Prop({
    type: [QuestionOptionSchema],
  })
  options: QuestionOption[];
}
export const QuestionSchema = SchemaFactory.createForClass(Question);
