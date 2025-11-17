import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ระบบสั่งซื้อเสื้อเฉลิมฉลอง 243 ปี จังหวัดศรีสะเกษ",
  description: "สู่ขวัญบ้าน บายศรีเมือง รุ่งเรือง 243 ปี",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
