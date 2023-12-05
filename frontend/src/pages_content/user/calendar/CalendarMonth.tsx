import React from "react";
import { Box, Flex, Center } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

type CalendarMonthProps = {
    month: string,
    changeMonthHandler: (type: string) => void
}

const CalendarMonth: React.FC<CalendarMonthProps> = ({month, changeMonthHandler}) => {
    return (
        <Flex mb='10px'>
            <Center cursor='pointer'>
                <ChevronLeftIcon onClick={() => changeMonthHandler('decrease')} />
            </Center>
            <Box w='150px' textAlign='center'>{month}</Box>
            <Center cursor='pointer'>
                <ChevronRightIcon onClick={() => changeMonthHandler('increase')} />
            </Center>
        </Flex> 
    );
}

export default CalendarMonth;