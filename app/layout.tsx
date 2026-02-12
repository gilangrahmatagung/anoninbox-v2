import type { Metadata } from "next";
import "./globals.css";
import MenuWithAuth from "@/components/MenuWithAuth";
import Footer from "@/components/Footer";


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
    <html lang="id">
      <body className="min-h-screen flex flex-col bg-neutral-900 text-neutral-100">
        <header className="sticky top-0 z-50">
          <MenuWithAuth />
        </header>
        <main className="flex-1 px-4 sm:px-6 py-6 max-w-4xl w-full mx-auto">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
