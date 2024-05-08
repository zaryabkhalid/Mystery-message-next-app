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
import { Trash2 } from "lucide-react";
import axios from "axios";
import { ApiResponse } from "@/types/ApiResponse";
import dayjs from "dayjs";

type MessageProps = {
	message: Message;
};

const MessageCard = ({ message }: MessageProps) => {
	const { toast } = useToast();

	const handleDeleteConfirm = async () => {
		const response = await axios.delete<ApiResponse>(`/api/delete-message/${message._id}`);

		toast({
			title: response.data.message,
		});
	};

	return (
		<>
			<Card>
				<CardHeader>
					<div className="flex justify-between">
						<CardTitle>Mystery Message</CardTitle>
						<AlertDialog>
							<AlertDialogTrigger asChild>
								<Button variant="default" className="bg-red-600">
									<Trash2 className="h-5 w-5 text-slate-200" />
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
