import Navbar from "@/components/Navbar";
import type { Metadata } from "next";

interface RootLayout {
	children: React.ReactNode;
}

export const metadata: Metadata = {
	title: "Dashboard",
	description: "User Dashboard to see messages",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div>
			<Navbar />
			<div>{children}</div>
		</div>
	);
}
