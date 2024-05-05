import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/VerificationEmails";
import { ApiResponse } from "@/types/ApiResponse";

export async function sendVerificationEmail(
	email: string,
	username: string,
	verifyCode: string
): Promise<ApiResponse> {
	try {
		await resend.emails.send({
			from: process.env.RESEND_EMAIL!,
			to: email,
			subject: "Mystry Message | Verification code.",
			react: VerificationEmail({ username, otp: verifyCode }),
		});

		return { success: true, message: "Verification email send Successfully." };
	} catch (emailError) {
		console.error("Error Sending verification email.", emailError);
		return { success: false, message: "Failed to send verification email." };
	}
}
