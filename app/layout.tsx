import type { Metadata } from "next";
import { Ubuntu } from "next/font/google";
import "./globals.css";
import Image from "next/image";

const ubuntu = Ubuntu({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Multi-step form",
  description: "Multi-step form excersice for FrontendMentor",
  authors: [
    { name: "Francisco Valle", url: "https://www.cescovalle.com/" },
    { name: "Frontend Mentor", url: "https://www.frontendmentor.io/" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={ubuntu.className}>
        <main className="bg-background flex flex-col min-h-screen">
          <div className="h-40 relative md:hidden">
            <Image
              fill
              className="md:hidden object-cover"
              src={"/images/bg-sidebar-mobile.svg"}
              alt={"bg-sidebar-mobile"}
              priority
            />
          </div>
          <div className="absolute top-24 left-0 right-0 md:relative md:top-10 md:self-center">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
