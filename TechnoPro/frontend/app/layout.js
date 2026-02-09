import { Montserrat, Inter } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "TechnoPro",
  description: "TechnoPro is a leading software development company based in Damascus, Syria, specializing in modern web and mobile applications, system analysis, and custom software solutions. We deliver innovative technology solutions that drive business growth and digital transformation.",
  keywords: "software development, web development, mobile apps, Damascus Syria, technology solutions, system analysis, custom software",
  authors: [{ name: "TechnoPro" }],
  creator: "TechnoPro",
  publisher: "TechnoPro",
  openGraph: {
    title: "TechnoPro | Professional Software Solutions",
    description: "Leading software development company in Damascus, Syria, delivering innovative technology solutions.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "TechnoPro | Professional Software Solutions",
    description: "Leading software development company in Damascus, Syria, delivering innovative technology solutions.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#2293A4" />
      </head>
      <body
        className={`${montserrat.variable} ${inter.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}