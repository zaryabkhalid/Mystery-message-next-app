import { z } from "zod";
import UserModel from "@/model/user.model";
import dbConnect from "@/lib/dbConnect";
import { usernameValidation } from "@/schemas/signUpSchema";
import { ApiResponse } from "@/helpers/ApiResponse";

const UsernameQuerySchema = z.object({
	username: usernameValidation,
});

export async function GET(request: Request) {
	await dbConnect();
	try {
		const { searchParams } = new URL(request.url);
		const queryParam = { username: searchParams.get("username") };

		// Validate With Zod
		const result = UsernameQuerySchema.safeParse(queryParam);
		console.log("Zod Result:", result);
		if (!result.success) {
			const usernameErrors = result.error.format().username?._errors || [];

			return Response.json(
				{
					success: false,
					message:
						usernameErrors.length > 0
							? usernameErrors.join(", ")
							: "Invalid query parameters",
				},
				{ status: 400 }
			);
		}

		const { username } = result.data;

		const existingVerifiedUser = await UserModel.findOne({ username, isVerified: true });
		if (existingVerifiedUser) {
			// return Response.json(
			// 	{ success: false, message: "Username is already taken" },
			// 	{ status: 400 }
			// );
			const response = ApiResponse({
				success: false,
				message: "Username is already taken",
				status: 400,
			});
			return response;
		}
		return Response.json({ success: true, message: "Username is available" }, { status: 200 });
	} catch (error) {
		console.error("Error checking username", error);
		return Response.json(
			{ success: false, message: "Error checking username" },
			{ status: 500 }
		);
	}
}
