import mongoose, { Schema, Document } from "mongoose";
import { Message } from "./message.model";
import { MessageSchema } from "./message.model";

export interface User extends Document {
	username: string;
	email: string;
	password: string;
	isVerified: boolean;
	verifyCode: string;
	verifyCodeExpiry: Date;
	isAcceptingMessage: boolean;
	messages: Message[];
}

const UserSchema: Schema<User> = new mongoose.Schema({
	username: {
		type: String,
		required: [true, "Username is required"],
		trim: true,
		unique: true,
	},

	email: {
		type: String,
		required: [true, "email is required"],
		trim: true,
		unique: true,
		match: [/.+\@.+\..+/, "Please use a valid email address"],
	},
	password: {
		type: String,
		required: [true, "Password is required"],
	},
	isVerified: {
		type: Boolean,
		default: false,
	},
	verifyCode: {
		type: String,
		required: [true, "Verify code is required"],
	},
	verifyCodeExpiry: {
		type: Date,
	},
	isAcceptingMessage: {
		type: Boolean,
		default: true,
	},
	messages: [MessageSchema],
});

const UserModel =
	(mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User", UserSchema);

export default UserModel;
