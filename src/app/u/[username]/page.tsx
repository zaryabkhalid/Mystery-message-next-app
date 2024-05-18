"use client";

import AiMessageGenerator from "@/components/AiMessageGenerator";
import SendMessages from "@/components/SendMessages";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";

type UsernameParams = {
	username: string;
};

const Page = () => {
	const { username } = useParams<UsernameParams>();

	return (
		<>
			<div className="max-w-screen-xl  mx-auto p-10 md:p-24">
				<h1 className="text-center text-2xl md:text-4xl font-bold">Public Profile Link</h1>
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.1 }}>
					<SendMessages username={username} />
				</motion.div>

				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.3 }}>
					<AiMessageGenerator />
				</motion.div>
			</div>
		</>
	);
};

export default Page;
