"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { messageSchema } from "@/schemas/messageSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, SendHorizonal } from "lucide-react";
import axios, { AxiosError } from "axios";
import { ApiResponse } from "@/types/ApiResponse";
import { useToast } from "@/components/ui/use-toast";

type SendMessageProps = {
	username: string;
};
const SendMessages = ({ username }: SendMessageProps) => {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const { toast } = useToast();
	const form = useForm<z.infer<typeof messageSchema>>({
		resolver: zodResolver(messageSchema),
		defaultValues: {
			content: "",
		},
	});

	const onSubmit = async function (data: z.infer<typeof messageSchema>) {
		setIsSubmitting(true);

		try {
			const response = await axios.post<ApiResponse>("/api/send-message", {
				username: username,
				content: data.content,
			});
			if (response.data.isAcceptingMessage === false) {
				toast({
					title: "Not Accepting Messages",
					description: response.data.message,
					variant: "destructive",
					duration: 2000,
				});
				form.reset();
				return;
			}
			toast({
				title: "Message Sent",
				description: response.data.message,
				variant: "default",
				duration: 2000,
			});
			form.reset();
		} catch (error) {
			const axiosError = error as AxiosError<ApiResponse>;

			toast({
				title: "Sending Message Failed",
				description: axiosError.response?.data.message,
				variant: "destructive",
			});
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<>
			<div className="my-12">
				<p className="mb-8">Send Anonymous Message to @{username}</p>

				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
						<FormField
							name="content"
							control={form.control}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Message</FormLabel>
									<Input
										type="textarea"
										className="h-20"
										placeholder="Type Your Message"
										{...field}
									/>
									<FormMessage />
								</FormItem>
							)}
						/>

						<Button type="submit" disabled={isSubmitting} className=" font-semibold">
							{isSubmitting ? (
								<>
									<Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting
								</>
							) : (
								<>
									Send Message <SendHorizonal className="ml-1 w-5 h-5" />
								</>
							)}
						</Button>
					</form>
				</Form>
			</div>
		</>
	);
};

export default SendMessages;
