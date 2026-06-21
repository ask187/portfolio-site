import type { Metadata, Viewport } from "next";
import "./globals.css";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import Navbar from "@/components/Navbar";
import ScrollProgress from "@/components/ScrollProgress";

export const metadata: Metadata = {
  title: "Aravind Santhosh Kumar — Systems Engineer",
  description:
    "Systems engineer building distributed real-time, ML, and backend infrastructure. MS Computer Science, Northeastern.",
  metadataBase: new URL("https://example.com"),
  openGraph: {
    title: "Aravind Santhosh Kumar — Systems Engineer",
    description:
      "Distributed real-time systems, applied ML, and high-throughput backend architecture.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#05060a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-ink-950">
      <body className="bg-ink-950 text-white antialiased">
        <SmoothScrollProvider>
          <ScrollProgress />
          <Navbar />
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
