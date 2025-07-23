import { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ClassMate",
  description: "Manage student information easily with ClassMate.",
  icons: "/iconsLogo.png"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}