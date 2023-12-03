import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Box, Center, Flex, useColorMode } from "@chakra-ui/react";
import React from "react";
import moment from "moment";
import CalendarDayInfo from "./calendar_day_info";

type CalendarBodyProps = {
    weeks: any[][],
    setInputValueHandler: (value: string) => void,
    month: string,
    changeMonthHandler: (type: string) => void,
    inputValue: string,
    userId: string
}

const CalendarBody: React.FC<CalendarBodyProps> = ({
    weeks,
    setInputValueHandler,
    month,
    changeMonthHandler,
    inputValue,
    userId
}) => {
    const { colorMode } = useColorMode();

    return (
        <Box w='fit-content' mt='20px'>
            <Flex mb='10px'>
                <Center cursor='pointer'>
                    <ChevronLeftIcon onClick={() => changeMonthHandler('decrease')} />
                </Center>
                <Box w='150px' textAlign='center'>{month}</Box>
                <Center cursor='pointer'>
                    <ChevronRightIcon onClick={() => changeMonthHandler('increase')} />
                </Center>
            </Flex>  
            <Box>
                {weeks.map((item, idx) => 
                    <Flex
                        key={`${item[0]}_${idx}`}
                        sx={{
                            '&:first-of-type': {
                                justifyContent: 'flex-end'
                            }
                        }}
                    >
                        {item.map((unit, index) =>
                            <Box
                                key={`${unit}_${index}`}
                                boxSizing="content-box"
                                p='0 5px'
                                w='50px'
                                h='60px'
                                bg={moment().format('DD.MM.YYYY') === unit.format('DD.MM.YYYY') ?
                                    (colorMode === 'dark' ? 'gray.600' : 'gray.300') : 'none'
                                }
                                borderTop={idx === 0 || idx === 1 ? '1px solid #d6d6d6' : 'none'}
                                borderLeft='1px solid #d6d6d6'
                                borderBottom={idx === 0 ? 'none' : '1px solid #d6d6d6'}
                                cursor='pointer'
                                position='relative'
                                sx={{
                                    '&:last-child': {
                                        borderRight: '1px solid #d6d6d6'
                                    },
                                    '&:after': inputValue === unit.format('DD.MM.YYYY') ? {
                                        content: '""',
                                        display: 'block',
                                        position: 'absolute',
                                        top: '0',
                                        left: '0',
                                        zIndex: '1',
                                        w: 'calc(100% - 8px)',
                                        h: 'calc(100% - 8px)',
                                        border: '4px solid yellow'
                                    } : 'none'
                                }}
                                onClick={() => setInputValueHandler(unit.format('DD.MM.YYYY'))}
                            >
                                {unit.format('DD')}
                            </Box>
                        )}
                    </Flex>
                )}
            </Box>
            <CalendarDayInfo userId={userId} />
        </Box>
    );
}

export default CalendarBody;