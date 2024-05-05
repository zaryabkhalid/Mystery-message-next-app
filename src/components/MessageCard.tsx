"use client";
import { Message } from "@/model/message.model";
import { useToast } from "./ui/use-toast";
import { Button } from "./ui/button";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { X } from "lucide-react";
import axios from "axios";
import { ApiResponse } from "@/types/ApiResponse";
import dayjs from "dayjs";

type MessageProps = {
	message: Message;
	onMessageDelete: (messageId: string) => void;
};

const MessageCard = ({ message, onMessageDelete }: MessageProps) => {
	const { toast } = useToast();

	const handleDeleteConfirm = async () => {
		const response = await axios.delete<ApiResponse>(`/api/delete-message/${message._id}`);
		toast({
			title: response.data.message,
		});
		onMessageDelete(message._id);
	};

	return (
		<>
			<Card>
				<CardHeader>
					<div className="flex justify-between">
						<CardTitle>Mystery Message</CardTitle>
						<AlertDialog>
							<AlertDialogTrigger asChild>
								<Button variant="destructive">
									<X className="h-5 w-5" />
								</Button>
							</AlertDialogTrigger>
							<AlertDialogContent>
								<AlertDialogHeader>
									<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
									<AlertDialogDescription>
										This action cannot be undone. This will permanently delete
										your account and remove your data from our servers.
									</AlertDialogDescription>
								</AlertDialogHeader>
								<AlertDialogFooter>
									<AlertDialogCancel>Cancel</AlertDialogCancel>
									<AlertDialogAction onClick={handleDeleteConfirm}>
										Confirm
									</AlertDialogAction>
								</AlertDialogFooter>
							</AlertDialogContent>
						</AlertDialog>
					</div>
				</CardHeader>
				<CardContent>
					<p>{message.content}</p>
				</CardContent>
				<CardFooter>
					<p className="text-sm text-zinc-500">
						{dayjs(message.createdAt).format("MMM D, YYYY h:mm A")}
					</p>
				</CardFooter>
			</Card>
		</>
	);
};

export default MessageCard;
