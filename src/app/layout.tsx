import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";

import "@/common/styles/globals.css";

export const metadata: Metadata = {
	title: "Notarius",
	description: "Send and sign documents digitally!",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${GeistSans.className} antialiased`}>{children}</body>
		</html>
	);
}
