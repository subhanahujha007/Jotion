import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ConvexChildProvider } from "@/components/convex-provider";
import {Toaster} from "sonner"
import { EdgeStoreProvider } from "@/lib/edgestore";
import { Modelprovider } from "@/components/Settings-model";
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
          <EdgeStoreProvider>
        <ThemeProvider attribute="class"
            defaultTheme="system"
            enableSystem
disableTransitionOnChange
storageKey="Jotion-change-theme">
  <Toaster className="bottom-center"/>
  <Modelprovider/>
  {children}</ThemeProvider>
  </EdgeStoreProvider>
</ConvexChildProvider>
        </body>
    </html>
  );
}
