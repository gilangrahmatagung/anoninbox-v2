import type { Metadata } from "next";
import "./globals.css";

import { Menu } from "@/components/Menu";

export const metadata: Metadata = {
  title: "AnonInbox",
  description: "Get honest advice with anonymous message box",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <header>
          <Menu />
        </header>
        {children}
      </body>
    </html>
  );
}
