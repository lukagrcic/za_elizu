import "./globals.css";
import { AuthProvider } from "@/components/AuthProvider";
import AppShell from "@/components/AppShell";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sr">
      <body>
        <AuthProvider>
          <AppShell>{children}</AppShell>
        </AuthProvider>
      </body>
    </html>
  );
}

