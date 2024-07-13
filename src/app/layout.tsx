import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ConvexChildProvider } from "@/components/convex-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Jotion",
  description: "workspace efficency",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ConvexChildProvider>
        <ThemeProvider attribute="class"
            defaultTheme="system"
            enableSystem
disableTransitionOnChange
storageKey="Jotion-change-theme">{children}</ThemeProvider>
</ConvexChildProvider>
        </body>
    </html>
  );
}
