import { BotMessageSquare } from "lucide-react";
export default function Home() {
	return (
		<div className="min-h-screen py-24 px-3 md:p-24 flex flex-col justify-center items-center gap-4">
			<div className="min-h-full flex justify-center items-center">
				<h1 className="text-3xl  md:text-6xl font-medium">Mystery Message</h1>
				<BotMessageSquare className="ml-3 w-20 h-20  md:w-32 md:h-32 text-zinc-700" />
			</div>
		</div>
	);
}
