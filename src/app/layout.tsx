import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "メモ帳アプリ",
  description: "シンプルなメモ帳アプリケーション",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="bg-gray-50">{children}</body>
    </html>
  );
}