import type { Metadata } from "next";

interface RootLayout {
	children: React.ReactNode;
}

export const metadata: Metadata = {
	title: "Dashboard",
	description: "User Dashboard Page ",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return <div>{children}</div>;
}
