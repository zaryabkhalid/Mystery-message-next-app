"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ApiResponse } from "@/types/ApiResponse";

const fetchAcceptMessages = async () => {
	const response = await axios.get<ApiResponse>("/api/accept-messages");
	return response?.data;
};

export function useAcceptMessageQuery() {
	return useQuery({
		queryKey: ["acceptMessageStatus"],
		queryFn: () => fetchAcceptMessages(),
	});
}
