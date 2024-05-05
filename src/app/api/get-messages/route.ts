import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/user.model";
import { User } from "next-auth";
import { ApiResponse } from "@/helpers/ApiResponse";
import mongoose from "mongoose";

export async function GET(request: Request) {
	await dbConnect();

	const session = await getServerSession(authOptions);
	const userSession: User = session?.user as User;

	if (!session || !userSession) {
		const response = ApiResponse({ success: false, message: "Not Authenticated", status: 401 });
		return response;
	}

	const userId = new mongoose.Types.ObjectId(userSession._id);

	try {
		// Aggregation pipeline for getting messages
		const user = await UserModel.aggregate([
			{
				$match: { _id: userId },
			},
			{
				$unwind: { path: "$messages" },
			},
			{
				$sort: { "messages.createdAt": -1 },
			},
			{
				$group: { _id: "$_id", messages: { $push: "$messages" } },
			},
		]).exec();

		if (!user) {
			return Response.json(
				{ message: "Failed To Found User.", success: false },
				{ status: 404 }
			);
		}
		if (user.length <= 0) {
			return Response.json(
				{ message: "Your Message bucket is empty.", success: false },
				{ status: 404 }
			);
		}
		return Response.json({ messages: user[0].messages }, { status: 200 });
	} catch (error) {
		console.error("An unexpected error occurred", error);
		const response = ApiResponse({
			success: false,
			message: "Internal Server Error",
			status: 500,
		});
		return response;
	}
}
