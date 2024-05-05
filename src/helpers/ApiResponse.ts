export interface ApiResponse {
	success: boolean;
	message: string;
	data?: any; // TODO: Not a good practise to use any type
	status: number;
}
export function ApiResponse({ success, message, data, status }: ApiResponse) {
	return Response.json({ success: success, message: message, data: data }, { status: status });
}
