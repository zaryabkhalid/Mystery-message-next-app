import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/user.model";
import { User } from "next-auth";
import { ApiResponse } from "@/helpers/ApiResponse";
import mongoose from "mongoose";

export async function POST(request: Request) {
	await dbConnect();

	const session = await getServerSession(authOptions);
	console.log("Session: ", session);
	const sessionUser: User = session?.user as User;
	if (!session || !session.user) {
		const response = ApiResponse({ success: false, message: "Not Authenticated", status: 401 });
		return response;
	}
	const userID = new mongoose.Types.ObjectId(sessionUser._id);
	const { acceptMessages } = await request.json();
	try {
		const updatedUser = await UserModel.findByIdAndUpdate(
			userID,
			{ isAcceptingMessage: acceptMessages },
			{ new: true }
		);

		if (!updatedUser) {
			const response = ApiResponse({
				success: false,
				message: "Failed to update user status to accept messages.",
				status: 401,
			});
			return response;
		}
		const response = ApiResponse({
			success: true,
			message: "Message Acceptance status updated successfully.",
			data: updatedUser,
			status: 200,
		});
		return response;
	} catch (error) {
		console.error("Failed to update user status to accept messages.");
		const response = ApiResponse({
			success: false,
			message: "Failed to update user status to accept messages.",
			status: 500,
		});
		return response;
	}
}

export async function GET(request: Request) {
	await dbConnect();
	const session = await getServerSession(authOptions);
	const sessionUser: User = session?.user as User;
	if (!session || !session.user) {
		return ApiResponse({ success: false, message: "Not Authenticated", status: 401 });
	}

	const userID = sessionUser?._id;

	try {
		const updatedUser = await UserModel.findById(userID);
		if (!updatedUser) {
			return ApiResponse({
				success: false,
				message: "User Not Found.",
				status: 404,
			});
		}
		return Response.json(
			{ success: true, isAcceptingMessage: updatedUser.isAcceptingMessage },
			{ status: 200 }
		);
	} catch (error) {
		console.error("Failed to update user status to accept messages.");
		return ApiResponse({
			success: false,
			message: "Error in getting message accepting status.",
			status: 500,
		});
	}
}
