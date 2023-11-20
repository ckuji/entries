import { AppProps } from 'next/app';
import Head from 'next/head';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '../theme';
import MainLayout from '../components/layout/MainLayout';
import { store } from '../state/store';
import { Provider } from 'react-redux';
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({ subsets: ['latin'] });

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