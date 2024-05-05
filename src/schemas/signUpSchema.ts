import { z } from "zod";

export const usernameValidation = z
	.string()
	.min(2, "Username must be atleast 2 characters")
	.max(18, "Username must be no more than 18 characters")
	.regex(
		/^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,17}$/gim,
		"Username must not contain special characters"
	);

export const signUpSchema = z.object({
	username: usernameValidation,
	email: z.string().email({ message: "Invalid Email Address" }),
	password: z
		.string()
		.regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[\W_]).{8,16}$/, {
			message:
				"Password must contain atleast 1 uppercase, 1 lowercase, 1 special character having min 8, max 18 characters.",
		})
		.min(8, { message: "Password must be atleast 8 characters" })
		.max(18, { message: "Password must be not more than 18 characters" }),
});
