import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Script from 'next/script';
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
<Script
  src="http://localhost:4000/sdk/widget.js"
  data-key="chatsop_dda09084900f187fc3f0d8a5bc488c806b72f24f3c49f42b"
  data-api-base-url="http://localhost:4000"
  strategy="afterInteractive"
/>
      </body>
    </html>
  );
}
