import { useAcceptMessageQuery } from "@/hooks/useAcceptMessageQuery";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { acceptMessageSchema } from "@/schemas/acceptMessageSchema";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import axios, { AxiosError } from "axios";
import { ApiResponse } from "@/types/ApiResponse";
import { useMemo } from "react";
import { Badge } from "./ui/badge";

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

	const acceptMessages = watch("acceptMessages");

	const handleSwitchChange = async () => {
		try {
			const response = await axios.post<ApiResponse>("/api/accept-messages", {
				acceptMessages: !acceptMessages,
			});

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

	return (
		<div className="my-8 flex items-center">
			<Switch
				{...register("acceptMessages")}
				checked={acceptMessages}
				onCheckedChange={handleSwitchChange}
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
