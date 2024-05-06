import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ApiResponse } from "@/types/ApiResponse";

const fetchMessages = async () => {
	const response = await axios.get<ApiResponse>("/api/get-messages");
	return response;
};
export function useMessages() {
	return useQuery({
		queryKey: ["messages"],
		queryFn: () => fetchMessages(),
	});
}
