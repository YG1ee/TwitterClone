import type { Metadata } from "next";
import { Orbit } from "next/font/google";

import "./globals.css";

export const metadata: Metadata = {
  title: "트위터 클론코딩 by YG1ee",
  description: "YG1ee Next Playground",
};

const orbit = Orbit({ weight: "400", subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className={orbit.className}>{children}</body>
    </html>
  );
}
