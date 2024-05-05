"use client";

import AiMessageGenerator from "@/components/AiMessageGenerator";
import SendMessages from "@/components/SendMessages";
import { useParams } from "next/navigation";

type UsernameParams = {
	username: string;
};

const Page = () => {
	const { username } = useParams<UsernameParams>();

	return (
		<>
			<div className="max-w-screen-xl  mx-auto p-10 md:p-24">
				<h1 className="text-center text-2xl md:text-4xl font-bold">Public Profile Link</h1>
				<div>
					<SendMessages username={username} />
				</div>

				<div>
					<AiMessageGenerator />
				</div>
			</div>
		</>
	);
};

export default Page;
