import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/providers";
import { themeScript } from "@/shared/utils/theme-script";

export const metadata: Metadata = {
  title: "Mi App - Autenticación",
  description: "Sistema de autenticación con soporte de tema oscuro/claro",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#ffffff" />
        <meta name="color-scheme" content="light dark" />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body suppressHydrationWarning className="theme-transition">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
