import '@/styles/globals.css';
import { Metadata, Viewport } from 'next';
import clsx from 'clsx';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Toaster } from 'react-hot-toast';

import { Providers } from './providers';

import { siteConfig } from '@/config/site';
import { fontSans, prompt } from '@/config/fonts';
import { Navbar } from '@/components/navbar';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  // manifest: '/manifest.json',
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: '/favicon.ico',
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
};

const locales = ['en', 'th'];

export default async function LocaleLayout({ children, params }: any) {
  const { locale } = await params;

  if (!locales.includes(locale)) {
    notFound();
  }

  const messages = await getMessages({ locale });

  return (
    <html
      lang={locale}
      suppressHydrationWarning
    >
      <body className={clsx('min-h-screen bg-background font-sans antialiased', fontSans.variable)}>
        <NextIntlClientProvider
          key={locale}
          locale={locale}
          messages={messages}
        >
          <Providers themeProps={{ attribute: 'class', defaultTheme: 'dark' }}>
            <Toaster
              position='top-center'
              containerClassName={clsx(prompt.className)}
            />

            <div className='relative flex flex-col h-screen'>
              <Navbar />

              <main className={clsx(prompt.className, 'container mx-auto max-w-7xl p-6 flex-grow')}>{children}</main>

              <footer className='w-full flex items-center justify-center py-3'>
                <span className='text-xs text-default-600 pr-2'>Copyright © {new Date().getFullYear()}</span>
                <p className='text-xs text-cyan-700'>hznutx</p>
              </footer>
            </div>
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
