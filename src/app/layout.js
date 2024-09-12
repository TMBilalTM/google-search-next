import './globals.css';
import Footer from '@/components/Footer';
import Head from 'next/head';

export const metadata = {
  title: 'Google Search',
  description:
    'BilalTM Google Search',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <Head>
      <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6552842490814267"
     crossorigin="anonymous" />
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="google-adsense-account" content="ca-pub-6552842490814267" />
        <meta name="description" content={metadata.description} />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={metadata.title} />
        <meta property="og:description" content={metadata.description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://bilaltm.online" />
        <meta property="og:image" content="https://ibb.co/5rmZgn7" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content={metadata.title} />
        <meta property="twitter:description" content={metadata.description} />
        <meta property="twitter:image" content="https://ibb.co/5rmZgn7" />
        <title>{metadata.title}</title>
      </Head>
      <body className='relative min-h-screen'>
        {children}
        <Footer />
      </body>
    </html>
  );
}
