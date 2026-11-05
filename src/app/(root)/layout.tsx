import "../globals.css";
import { fontVars } from "@/lib/fonts";

// Root "/" only redirects to a language. Kept minimal on purpose.
export default function RootRedirectLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark">
      <body className={`${fontVars} antialiased`}>{children}</body>
    </html>
  );
}
