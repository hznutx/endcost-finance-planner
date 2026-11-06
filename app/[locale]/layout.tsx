import '@/styles/globals.css';
import { Metadata, Viewport } from 'next';
import clsx from 'clsx';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Toaster } from 'react-hot-toast';
import { Providers } from './providers';

import { siteConfig } from '@/config/site';
import { fontSans, prompt } from '@/config/fonts';
import { notFound } from 'next/navigation';
import Navbar from '@/components/navbar';

export const metadata: Metadata = {
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
      <body className={clsx('min-h-screen bg-fixed !bg-[linear-gradient(160deg,#f4f7fc,#eaf1fb)] dark:!bg-[linear-gradient(160deg,#0a0f1d,#0e1628)] font-sans antialiased', fontSans.variable)}>
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

            <div className='relative w-full'>
              <Navbar />
              <main className={clsx(prompt.className, 'mx-auto xl:mx-0 max-w-7xl xl:max-w-max p-4 xl:p-0')}>{children}</main>
            </div>
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
