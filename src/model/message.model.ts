import mongoose, { Schema, Document, models } from "mongoose";

export interface Message extends Document {
	content: string;
	createdAt: Date;
}

export const MessageSchema: Schema<Message> = new mongoose.Schema({
	content: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
		required: true,
		default: Date.now(),
	},
});

const MessageModel =
	(mongoose.models.Message as mongoose.Model<Message>) ||
	mongoose.model<Message>("Message", MessageSchema);

export default MessageModel;
