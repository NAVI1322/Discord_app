import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from '@clerk/nextjs'
import { ThemeProvider } from "@/components/providers/theme-provider";
import { cn } from "@/lib/utils";
import { ModalProvider } from "@/components/providers/modal-provider";

const font = Open_Sans({ subsets: ["latin"] });   // here font is changed From inter to Open_Sans

export const metadata: Metadata = {
  title: "Discord App ",
  description: "Chat Application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // there I have added ClerkProvider and ThemeProvider
  return (
    <ClerkProvider>
    <html lang='en' suppressHydrationWarning>
     
                        {/* added colour for dark and light theme  */}
     <body className={cn(font.className,"bg-white dark:bg-[#313338]")}>  
        <ThemeProvider 
        attribute="class"
        defaultTheme="light"
        enableSystem={true}
        storageKey="discord-theme">
                    <ModalProvider />
                    {children}
                    
        </ThemeProvider>
     </body>
    </html>
  </ClerkProvider>
  )
}
