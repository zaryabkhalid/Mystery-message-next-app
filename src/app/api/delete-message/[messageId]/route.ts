import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/user.model";
import { User } from "next-auth";
import { ApiResponse } from "@/helpers/ApiResponse";

export async function DELETE(request: Request, { params }: { params: { messageId: string } }) {
	await dbConnect();
	const messageID = params.messageId;
	const session = await getServerSession(authOptions);
	const userSession: User = session?.user as User;

	if (!session || !session.user) {
		const response = ApiResponse({ success: false, message: "Not Authenticated", status: 401 });
		return response;
	}

	try {
		const updatedResult = await UserModel.updateOne(
			{ _id: userSession._id },
			{ $pull: { messages: { _id: messageID } } }
		);
		if (updatedResult.modifiedCount == 0) {
			const response = ApiResponse({
				success: false,
				message: "Message not found Or already deleted",
				status: 404,
			});
			return response;
		}
		const response = ApiResponse({ success: true, message: "Message Deleted", status: 200 });
		return response;
	} catch (error) {
		console.log("error in deleting message", error);
		const response = ApiResponse({
			success: false,
			message: "Error deleting message",
			status: 500,
		});
		return response;
	}
}
