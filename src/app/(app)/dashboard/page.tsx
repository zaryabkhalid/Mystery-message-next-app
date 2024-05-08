"use client";
import { Separator } from "@/components/ui/separator";
import { useSession } from "next-auth/react";
import ShowMessagesList from "@/components/ShowMessagesList";
import AcceptMessages from "@/components/AcceptMessages";
import CopyToClipboard from "@/components/CopyToClipboard";

const Dashboard = () => {
	const { data: session } = useSession();

	if (!session || !session.user) {
		return <div className="">Please Login </div>;
	}

	return (
		<>
			<div className="mx-4 md:mx-8 lg:mx-auto py-24  rounded w-full max-w-6xl">
				<h1 className="text-4xl font-bold my-4">User Dashboard</h1>
				<CopyToClipboard session={session} />
				<AcceptMessages />
				<Separator />
				<ShowMessagesList />
			</div>
		</>
	);
};
export default Dashboard;
