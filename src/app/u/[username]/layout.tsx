import type { Metadata } from "next";

interface RootLayout {
	children: React.ReactNode;
}

export const metadata: Metadata = {
	title: "Send Message ✉",
	description: "Send Message to user without exposing yourself.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return <div>{children}</div>;
}
