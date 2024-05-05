"use client";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { signInSchema } from "@/schemas/signInSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { BotMessageSquare, Loader2 } from "lucide-react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const SignIn = () => {
	const router = useRouter();
	const { toast } = useToast();
	const [isSubmitting, setIsSubmitting] = useState(false);

	const form = useForm<z.infer<typeof signInSchema>>({
		resolver: zodResolver(signInSchema),
		defaultValues: {
			identifier: "",
			password: "",
		},
	});

	const onSubmit = async (data: z.infer<typeof signInSchema>) => {
		setIsSubmitting(true);

		const result = await signIn("credentials", {
			redirect: false,
			identifier: data.identifier,
			password: data.password,
		});

		if (result?.error) {
			toast({
				title: "Login Failed",
				description: "Invalid Username or password",
				variant: "destructive",
			});
			setIsSubmitting(false);
		}

		if (result?.url) {
			setIsSubmitting(false);
			router.replace("/dashboard");
			setIsSubmitting(false);
			form.reset({ identifier: "", password: "" });
		}
	};

	return (
		<div className="flex justify-center items-center min-h-screen ">
			<div className="w-full max-w-md p-8 space-y-8  rounded-lg border border-zinc-800 shadow-lg">
				<div className="text-center">
					<h1 className="text-4xl font-extrabold lg:text-5xl mb-3">
						Join Mystery Message
						<BotMessageSquare className=" ml-3 inline w-12 h-12 text-zinc-800" />
					</h1>
					<p className="my-4">Sign In to start your anonymous advanture</p>
				</div>

				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
						<FormField
							name="identifier"
							control={form.control}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Username</FormLabel>
									<FormControl>
										<Input placeholder="Email/Username" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							name="password"
							control={form.control}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Password</FormLabel>
									<FormControl>
										<Input type="password" placeholder="Password" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<Button
							className="w-full m-auto text-base font-semibold"
							type="submit"
							disabled={isSubmitting}>
							{isSubmitting ? (
								<>
									<Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting
								</>
							) : (
								"Sign In"
							)}
						</Button>

						<hr className="border-1 border-zinc-800" />

						<Button
							className="w-full text-base font-semibold"
							onClick={() => signIn("github")}>
							Sign in with Github
						</Button>
					</form>
				</Form>
				<div className="text-center mt-4">
					<p>
						Not a member?{" "}
						<Link href="/sign-up" className="text-blue-600 hover:text-blue-800">
							Sign up
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
};

export default SignIn;
