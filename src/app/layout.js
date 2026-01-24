import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "Consulta Horários Ônibus Fortaleza",
  description: "Aplicativo para consulta de horários de ônibus em Fortaleza",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Horários Ônibus",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="apple-touch-icon" href="/icons/icon-152x152.png" />
        <meta
          name="msapplication-TileImage"
          content="/icons/icon-144x144.png"
        />
        <link rel="manifest" href="/manifest.json" />
        <meta name="msapplication-TileColor" content="#ff6b00" />
      </head>
      <body
        className={`${poppins.variable} antialiased text-[var(--text-main)] traccking-wide`}
      >
        {children}
      </body>
    </html>
  );
}