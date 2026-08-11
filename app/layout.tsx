import type { Metadata } from "next";
import ThemeRegistry from "@/providers/ThemeRegistry";
import PageShell from "@/components/PageShell";
import "./globals.css";

export const metadata: Metadata = {
  title: "Portfolio - MathDev",
  description: "Personal portfolio",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry>
          <PageShell>
            {children}
          </PageShell>
        </ThemeRegistry>
      </body>
    </html>
  );
}
