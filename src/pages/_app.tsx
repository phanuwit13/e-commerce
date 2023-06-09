import '@/app/globals.css';
import MainLayout from '@/layout/MainLayout';
import type { AppProps } from 'next/app';
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MainLayout>
      <Component {...pageProps} />
    </MainLayout>
  )
}
