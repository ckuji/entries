import { Box, Switch, Text, useColorMode, useColorModeValue } from "@chakra-ui/react";
import React, { useEffect } from "react";

const Header: React.FC = () => {
    const { colorMode, toggleColorMode } = useColorMode();
    const bg = useColorModeValue('gray.100', 'gray.700');

    const toggleColorModeHandler = () => {
        toggleColorMode();
    };

    return (
        <Box h='60px' bg={bg} display='flex' justifyContent='space-between' alignItems='center'>
            <Text>Logo</Text>
            <Switch size='lg' onChange={toggleColorModeHandler} isChecked={colorMode === 'dark'}/>
        </Box>
    )
}

export default Header;