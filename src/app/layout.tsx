import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import '../styles/login.css';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '700'], // pesos que vai usar
  variable: '--font-poppins',
})

export const metadata = {
  title: 'Kadoo Login',
  description: 'Tela de login',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br" className={poppins.variable}>
      <body>{children}</body>
    </html>
  )
}


