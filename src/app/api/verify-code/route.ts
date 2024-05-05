import UserModel from "@/model/user.model";
import dbConnect from "@/lib/dbConnect";
import { z } from "zod";
import { verifySchema } from "@/schemas/verifySchema";

const VerifyCodeQuery = z.object({
	code: z.string().length(6),
});

export async function POST(request: Request) {
	await dbConnect();
	try {
		const { username, code } = await request.json();
		console.log("Username and Code: ", username, code);
		const decodedUsername = decodeURIComponent(username);

		// Validation With Zod
		// const result = VerifyCodeQuery.safeParse(code);
		// console.log("Safe Parse Zod Code", result);
		// if (!result.success) {
		// 	const codeErrors = result.error.format().code?._errors || [];
		// 	return Response.json(
		// 		{
		// 			success: false,
		// 			message: codeErrors.length > 0 ? codeErrors.join(", ") : "Invalid Code",
		// 		},
		// 		{ status: 400 }
		// 	);
		// }

		const user = await UserModel.findOne({ username: decodedUsername });
		if (!user) {
			return Response.json({ success: false, message: "User not found" }, { status: 404 });
		}

		const isCodeValid = user.verifyCode === code;
		const isCodeNotExpired = new Date(user.verifyCodeExpiry) > new Date();

		if (isCodeValid && isCodeNotExpired) {
			user.isVerified = true;
			await user.save();
			return Response.json(
				{ success: true, message: "Account Verified Sucussfully" },
				{ status: 200 }
			);
		} else if (!isCodeNotExpired) {
			// TODO: Add Request for new verification code.
			return Response.json(
				{
					success: false,
					message: "Verification Code has expired Please Sign up again to get a new code",
				},
				{ status: 400 }
			);
		} else {
			return Response.json(
				{ success: false, message: "Incorrect Verification code." },
				{ status: 500 }
			);
		}
	} catch (error) {
		console.error("Error verifying user", error);
		return Response.json({ success: false, message: "Error verifying user" }, { status: 500 });
	}
}
