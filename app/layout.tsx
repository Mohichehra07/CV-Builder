import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'AI CV Builder',
  description: 'Build professional, stunning CVs with our AI-powered resume builder. Choose from multiple templates and export to PDF.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/logo.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/logo.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/logo.png',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        {children}
        <Analytics />
        <footer className="mt-auto py-8 border-t border-slate-800">
  <div className="container mx-auto px-4">
    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
      
      {/* Chap tomon: Sarlavha */}
      <div>
        <h3 className="text-lg font-semibold text-slate-600">Contact with me</h3>
        <p className="text-sm text-slate-400">Savollaringiz bo'lsa, bog'laning</p>
      </div>

      {/* O'ng tomon: Aloqa ma'lumotlari */}
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
        <div className="flex items-center gap-2">
          <span className="text-blue-500 font-bold">Telegram:</span>
          <a href="https://t.me/oyyuzli19" target="_blank" className="text-slate-600 hover:text-blue-700 transition-colors">
            @oyyuzli19
          </a>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-blue-500 font-bold">Email:</span>
          <a href="mailto:aminjonovamohichehra@gmail.com" className="text-slate-600 hover:text-blue-800 transition-colors text-sm">
            aminjonovamohichehra@gmail.com
          </a>
        </div>
      </div>

    </div>

    {/* Pastki chiziq va mualliflik huquqi */}
    <div className="mt-8 text-center text-xs text-slate-500">
      © {new Date().getFullYear()} Mohichehra. All rights reserved.
    </div>
  </div>
</footer>
      </body>
    </html>
  )
}
