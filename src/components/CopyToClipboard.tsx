import React from "react";
import { Button } from "./ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Session, User } from "next-auth";
import { Copy } from "lucide-react";

const CopyToClipboard = ({ session }: { session: Session }) => {
	const { toast } = useToast();

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
		<div className="my-8">
			<h2 className="flex items-center gap-x-3 text-lg font-semibold mb-3">
				Copy Your Unique Link
				<Copy className="h-5 w-5 cursor-pointer" onClick={copyToClipboard} />
			</h2>
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
	);
};

export default CopyToClipboard;
