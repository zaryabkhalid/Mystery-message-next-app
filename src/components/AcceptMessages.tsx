import { useAcceptMessageQuery } from "@/hooks/useAcceptMessageQuery";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { acceptMessageSchema } from "@/schemas/acceptMessageSchema";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import { ApiResponse } from "@/types/ApiResponse";
import { useMemo } from "react";
import { Badge } from "./ui/badge";
import { useMutation } from "@tanstack/react-query";

const AcceptMessages = () => {
	const { data, isLoading } = useAcceptMessageQuery();
	console.log("Data: ", data);
	const { toast } = useToast();

	const { register, watch, setValue } = useForm({
		resolver: zodResolver(acceptMessageSchema),
	});

	useMemo(() => {
		setValue("acceptMessages", data?.isAcceptingMessage);
	}, [data?.isAcceptingMessage, setValue]);

	const mutation = useMutation({
		mutationKey: ["updateAcceptMessageStatus"],
		mutationFn: async (acceptMessages: boolean) => {
			const response = await axios.post<ApiResponse>("/api/accept-messages", {
				acceptMessages: !acceptMessages,
			});

			// For optimistic update
			setValue("acceptMessages", !acceptMessages);

			return response?.data;
		},
		onSuccess: (data) => {
			toast({
				title: "Accepting Message Status",
				description: `User is Accepting Message: ${!acceptMessages}`,
				duration: 2000,
				variant: "default",
			});
		},
		onError: (error: any) => {
			console.log("Error Occur while updating accept message status", error);
			toast({
				title: "Error",
				description: "Something went wrong while updating accept message status ",
				variant: "destructive",
				duration: 2000,
			});
		},
	});

	const acceptMessages = watch("acceptMessages");

	return (
		<div className="my-8 flex items-center">
			<Switch
				{...register("acceptMessages")}
				checked={acceptMessages}
				onCheckedChange={() => {
					mutation.mutate(acceptMessages);
				}}
				disabled={isLoading}
			/>
			<span className=" ml-3">
				Accept Messages:
				<Badge
					variant={"secondary"}
					className={`${acceptMessages ? "bg-green-600" : "bg-red-600"} ml-2`}>
					{acceptMessages ? "On" : "Off"}
				</Badge>
			</span>
		</div>
	);
};

export default AcceptMessages;
