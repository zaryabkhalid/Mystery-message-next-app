import React from "react";
import MessageCard from "@/components/MessageCard";
import { useMessages } from "@/hooks/useMessagesQuery";
import { Loader2, RefreshCcwIcon } from "lucide-react";
import { Message } from "@/model/message.model";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";

const ShowMessagesList = () => {
	const { data, isLoading, refetch } = useMessages();
	const { toast } = useToast();
	// handle Refetch
	const handleRefetch = async () => {
		try {
			const { status } = await refetch();
			if (status === "success") {
				toast({
					title: "Refreshing Messages",
					description: " Messages Refreshes Successfully.",
					duration: 2000,
				});
			}
		} catch (error) {
			console.error(error);
			toast({
				title: "Somthing went Wrong",
				description: "Error while refreshing",
				duration: 2000,
			});
		}
	};
	return (
		<>
			<div className="mt-6">
				<Button variant="outline" onClick={handleRefetch}>
					Refresh <RefreshCcwIcon className=" ml-2 h-4 w-4" />
				</Button>

				<div>
					{isLoading ? (
						<>
							<Loader2 className="h-24 w-24 animate-spin mx-auto" />
						</>
					) : (
						<div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
							{data?.messages && data?.messages?.length > 0 ? (
								data?.messages?.map((message: Message) => {
									return <MessageCard key={message._id} message={message} />;
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

export default ShowMessagesList;
