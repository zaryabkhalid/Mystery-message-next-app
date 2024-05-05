"use client";
import { useState } from "react";
import { Button } from "./ui/button";
import { Brain, Loader2 } from "lucide-react";
import axios from "axios";
import { useToast } from "./ui/use-toast";

const AiMessageGenerator = () => {
	const { toast } = useToast();
	const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

	const generateMessage = async () => {
		setIsSubmitting(true);
		try {
			const response = await axios.post("/api/suggest-messages");
			console.log("Response: ", response);
		} catch (error) {
			console.log(error);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<>
			<div className="bg-zinc-950 py-8 px-2 rounded-lg shadow border border-zinc-800 flex flex-col justify-between gap-4 items-center">
				<p className="text-2xl md:text-4xl font-bold">
					Let me help you to generate something special
				</p>

				<Button className="my-6 font-semibold" onClick={generateMessage}>
					{isSubmitting ? (
						<>
							Generating <Loader2 className="ml-1 animate-spin" />
						</>
					) : (
						<>
							Generate Message <Brain className="ml-1 h-5 w-5" />
						</>
					)}
				</Button>
			</div>
		</>
	);
};

export default AiMessageGenerator;
