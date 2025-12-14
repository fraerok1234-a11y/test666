import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "PrinterPro - Професійні 3D Принтери",
	description: "Відкрийте світ 3D друку з нашими інноваційними рішеннями. Створюйте, проектуйте та реалізовуйте ваші ідеї.",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="uk">
			<body className={inter.className}>{children}</body>
		</html>
	);
}
