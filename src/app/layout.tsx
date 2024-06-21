import './globals.css'
import type { Metadata } from 'next'
import Providers from './providers-samechain'
import MainLayout from '@/components/layout/MainLayout';

export const metadata: Metadata = {
  title: 'Axiom Next.js Quickstart',
  description: 'A quickstart example that generates a ZK proof of a simple circuit.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <main className="flex flex-col w-screen min-h-screen justify-start items-center">
            <MainLayout>
              {children}
            </MainLayout>
          </main>
        </Providers>
      </body>
    </html>
  )
}
