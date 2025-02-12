import '@fortawesome/fontawesome-free/css/all.min.css';
import 'highlight.js/styles/stackoverflow-light.css';
import '@/styles/theme.scss';
import '@/styles/dashboard.scss';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { SessionProvider } from "next-auth/react";
import MainLayout from '@/layouts/main-layout';
import { ClientsProvider } from '@/client/context';


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session} refetchInterval={5 * 60}>
      <Head>
        <meta name="viewport" content="viewport-fit=cover" />
      </Head>
      <ClientsProvider>
        <MainLayout error={pageProps?.error}>
          <Component {...pageProps} />
        </MainLayout>
      </ClientsProvider>
    </SessionProvider>
  );
}

export default MyApp;
