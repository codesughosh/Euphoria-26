import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import Nav from "@/components/Nav";
import { AuthProvider } from "@/lib/firebase/AuthProvider";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "EUPHORIA — Freshers' Night",
  description: "The night you never forget. 25th September.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${poppins.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-black">
        <AuthProvider>
          <Nav />
          {children}
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  );
}
