import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from '@clerk/nextjs'
import { ThemeProvider } from "@/components/providers/theme-provider";

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
     
     <body>
        <ThemeProvider 
        attribute="class"
        defaultTheme="light"
        enableSystem={false}
        storageKey="discord-theme">
          
                    {children}

        </ThemeProvider>
     </body>
  
    </html>
  </ClerkProvider>
  )
}
