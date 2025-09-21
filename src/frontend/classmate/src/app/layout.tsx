import { Metadata } from "next";
import "./globals.css";
import NavBar from "@/components/NavBar";

export const metadata: Metadata = {
  title: "ClassMate - Student Management Made Easy",
  description: "Manage student information easily with ClassMate.",
  icons: "/iconsLogo.png"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {/* <NavBar /> */}
        {children}
      </body>
    </html>
  );
}
