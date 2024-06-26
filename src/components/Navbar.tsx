"use client";
import React from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { User } from "next-auth";
import { Button } from "./ui/button";
import { Sun, Moon, User2Icon, LogOut } from "lucide-react";
import { useTheme } from "next-themes";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
	DropdownMenuSeparator,
	DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
	const { data: session } = useSession();
	const { setTheme } = useTheme();

	type menuItems = {
		id: number;
		item: string;
		to: string;
	};

	const menuItems: menuItems[] = [
		{ id: 0, item: "About", to: "/about" },
		{ id: 1, item: "Blogs", to: "/blogs" },
		{ id: 2, item: "Projects", to: "/projects" },
	];

	const user: User = session?.user as User;
	return (
		<nav className="fixed w-full top-0 left-0 right-0 flex justify-between  items-center shadow-xl  h-20  px-4 md:px-6">
			<div>
				<a
					className="font-bold tracking-tight text-xl bg-zinc-900 p-3 rounded-lg text-white  md:text-3xl"
					href="/">
					Mystery Message
				</a>
			</div>

			<div className=" space-x-4">
				{menuItems.map((item) => (
					<Link href={item.to} key={item.id} className="font-semibold text-md ">
						{item.item}
					</Link>
				))}
			</div>

			<div className="flex justify-center items-center gap-4">
				{session ? (
					<>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button variant="outline" size="default">
									<User2Icon className="mr-2 w-5 h-5" /> Profile
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end">
								<DropdownMenuLabel>{user.username}</DropdownMenuLabel>
								<DropdownMenuSeparator />
								<DropdownMenuItem>
									<Link href={"/dashboard"}>Dashboard</Link>
								</DropdownMenuItem>
								<DropdownMenuItem
									className="cursor-pointer"
									onClick={() => signOut()}>
									Logout <LogOut className="h-5 w-5 ml-2" />
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</>
				) : (
					<>
						<div className="space-x-3">
							<Link href="/sign-in">
								<Button>Register</Button>
							</Link>
							<Link href="/sign-in">
								<Button>Login</Button>
							</Link>
						</div>
					</>
				)}

				{/* Change Dark Mode */}
				<div>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="outline" size="icon">
								<Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
								<Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
								<span className="sr-only">Toggle theme</span>
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							<DropdownMenuItem onClick={() => setTheme("light")}>
								Light
							</DropdownMenuItem>
							<DropdownMenuItem onClick={() => setTheme("dark")}>
								Dark
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
