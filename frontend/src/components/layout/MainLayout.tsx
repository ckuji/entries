import React from "react";
import { Box, Container } from "@chakra-ui/react";
import Header from "./Header";
import Footer from "./Footer";

type MainLayoutProps = {
    children: React.ReactNode
}

const MainLayout: React.FC<MainLayoutProps> = ({children}) => {
    return (
        <Container maxW='1240px' p='0 20px' minHeight='100vh' display='flex' flexDirection='column'>
            <Header />
            <Box
                display="flex"
                flexGrow='1'
                borderTopWidth='1px'
                borderTopStyle='solid'
                borderTopColor='gray.300'
                _dark={{
                    borderTopColor: 'gray.600'
                }}
            >
                {children}
            </Box>
            <Footer />
        </Container>
    )
}

export default MainLayout;