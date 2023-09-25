import { AppProps } from 'next/app';
import Head from 'next/head';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '../theme';
import MainLayout from '../components/layout/MainLayout';
import localFont from 'next/font/local';
import { store } from '../state/store';
import { Provider } from 'react-redux';

const montserrat = localFont({
    src: [
      {
        path: '../assets/fonts/Montserrat-Regular.ttf',
        weight: '400',
        style: 'normal',
      },
      {
        path: '../assets/fonts/Montserrat-Medium.ttf',
        weight: '500',
        style: 'normal',
      },
      {
        path: '../assets/fonts/Montserrat-SemiBold.ttf',
        weight: '600',
        style: 'normal',
      },
      {
        path: '../assets/fonts/Montserrat-Bold.ttf',
        weight: '700',
        style: 'normal',
      },
    ],
})

const MyApp = ({ Component, pageProps }: AppProps) => {
    return(
        <>
            <Head>
                <title>Next</title>
            </Head>
            <main className={montserrat.className}>
                <Provider store={store}>
                    <ChakraProvider theme={theme}>
                        <MainLayout>
                            <Component {...pageProps} />
                        </MainLayout>
                    </ChakraProvider>
                </Provider>

            </main>
        </>
    )
};

export default MyApp;