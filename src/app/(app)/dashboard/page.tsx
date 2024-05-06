"use client";
import MessageCard from "@/components/MessageCard";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { acceptMessageSchema } from "@/schemas/acceptMessageSchema";
import { ApiResponse } from "@/types/ApiResponse";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { Loader2, RefreshCcw } from "lucide-react";
import { User } from "next-auth";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMessages } from "@/hooks/useMessagesQuery";

const Dashboard = () => {
	const [isSwitchLoading, setIsSwitchLoading] = useState(false);
	const { toast } = useToast();
	const { data, isLoading, isFetching, error, refetch } = useMessages();
	const { data: session } = useSession();
	const form = useForm({
		resolver: zodResolver(acceptMessageSchema),
	});

	const handleDeleteMessage = (messageId: string) => {
		// setMessages(messages.filter((message) => message._id !== messageId));
	};

	const { register, watch, setValue } = form;
	const acceptMessages = watch("acceptMessages");

	// const fetchAcceptMessages = useCallback(async () => {
	// 	setIsLoading(true);
	// 	try {
	// 		const response = await axios.get<ApiResponse>("/api/accept-messages");
	// 		setValue("acceptMessages", response.data.isAcceptingMessage);
	// 	} catch (error) {
	// 		const axiosError = error as AxiosError<ApiResponse>;
	// 		toast({
	// 			title: "Error",
	// 			description: axiosError.response?.data.message || "Failed to fetch message setting",
	// 			variant: "destructive",
	// 		});
	// 	} finally {
	// 		setIsLoading(false);
	// 	}
	// }, [toast, setValue]);

	// useEffect(() => {
	// 	if (!session || !session.user) return;
	// 	fetchMessages();
	// 	fetchAcceptMessages();
	// }, [session, setValue, toast, fetchAcceptMessages, fetchMessages]);

	//  handle Switch change
	const handleSwitchChange = async () => {
		try {
			const response = await axios.post<ApiResponse>("/api/accept-messages", {
				acceptMessages: !acceptMessages,
			});
			// this is only for optimistic behaviour
			setValue("acceptMessages", !acceptMessages);
			toast({
				title: response.data.message,
				variant: "default",
				duration: 2000,
			});
		} catch (error) {
			const axiosError = error as AxiosError<ApiResponse>;
			toast({
				title: "Error",
				description: axiosError.response?.data.message || "Failed to fetch message setting",
				variant: "destructive",
			});
		}
	};

	if (!session || !session.user) {
		return <div>Please Login </div>;
	}

	const { username } = session?.user as User;
	const baseUrl = `${window.location.protocol}//${window.location.host}`;
	const profileUrl = `${baseUrl}/u/${username}`;

	const copyToClipboard = () => {
		navigator.clipboard.writeText(profileUrl);
		toast({
			title: "URL Copied",
			description: "Profile Url has been copied to clipboard",
		});
	};

	return (
		<>
			<div className="mx-4 md:mx-8 lg:mx-auto py-24  rounded w-full max-w-6xl">
				<h1 className="text-4xl font-bold mb-4">User Dashboard</h1>
				<div className="mb-4">
					<h2 className="text-lg font-semibold mb-2">Copy Your Unique Link</h2>
					<div className="flex items-center">
						<input
							type="text"
							value={profileUrl}
							disabled
							className="input input-bordered w-full p-2 mr-2"
						/>
						<Button onClick={copyToClipboard}>Copy</Button>
					</div>
				</div>

				<div className="mb-4">
					<Switch
						{...register("acceptMessages")}
						checked={acceptMessages}
						onCheckedChange={handleSwitchChange}
						disabled={isSwitchLoading}
					/>
					<span className="ml-2">Accept Messages: {acceptMessages ? "On" : "Off"}</span>
				</div>
				<Separator />

				<Button className="mt-4" variant="outline" onClick={() => refetch()}>
					Refresh <RefreshCcw className=" ml-2 h-4 w-4" />
				</Button>

				<div>
					{isFetching ? (
						<Loader2 className="h-24 w-24 animate-spin mx-auto" />
					) : (
						<div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
							{data?.data.messages && data.data?.messages?.length > 0 ? (
								data?.data?.messages?.map((message) => {
									return (
										<MessageCard
											key={message._id}
											onMessageDelete={handleDeleteMessage}
											message={message}
										/>
									);
								})
							) : (
								<p>No Messages To display</p>
							)}
						</div>
					)}
				</div>
			</div>
		</>
	);
};

export default Dashboard;
