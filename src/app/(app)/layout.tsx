import Navbar from "@/components/Navbar";
import type { Metadata } from "next";

interface RootLayout {
	children: React.ReactNode;
}

export const metadata: Metadata = {
	title: "Mystery Message",
	description: "This is the main page of the mystery message web app.",
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
