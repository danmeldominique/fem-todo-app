import { GlobalProvider } from '@/context/GlobalContext'
import './globals.css'
import type { Metadata } from 'next'
import { Josefin_Sans } from 'next/font/google'

const josefinSans = Josefin_Sans({ subsets: ['latin'],variable: '--josefin-sans' })

export const metadata: Metadata = {
  title: 'Todo App',
  description: 'Todo App',
  authors: [{name: 'Daniel Dominique'}],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${josefinSans.variable} font-sans flex flex-row justify-center items-center h-screen bg-L_VeryLightGray dark:bg-D_VeryDarkBlue`}>
        <GlobalProvider>
          {children}
        </GlobalProvider>
      </body>
    </html>
  )
}
