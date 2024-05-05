import { ApiResponse } from "@/helpers/ApiResponse";
import dbConnect from "@/lib/dbConnect";
import { Message } from "@/model/message.model";
import UserModel from "@/model/user.model";

export async function POST(request: Request) {
	await dbConnect();
	const { username, content } = await request.json();

	try {
		const user = await UserModel.findOne({ username: username });
		if (!user) {
			const response = ApiResponse({
				success: false,
				message: "User Not found",
				status: 404,
			});
			return response;
		}

		// Is user accepting the message;
		if (!user.isAcceptingMessage) {
			const response = ApiResponse({
				success: false,
				message: "User is not accepting messages",
				status: 403,
			});
			return response;
		}

		const newMessage = { content, createdAt: new Date() };
		user.messages.push(newMessage as Message);

		await user.save();
		const response = ApiResponse({
			success: true,
			message: "Message Sent successfully",
			status: 201,
		});
		return response;
	} catch (error) {
		console.error("Error while Sending message", error);
		const response = ApiResponse({
			success: false,
			message: "Error while sending message.",
			status: 500,
		});
		return response;
	}
}
