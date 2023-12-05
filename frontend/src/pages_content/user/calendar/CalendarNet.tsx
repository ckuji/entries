import { Box, Flex, useColorMode } from "@chakra-ui/react";
import React from "react";
import moment from "moment";

type CalendarNetProps = {
    weeks: any[][],
    dateValue: string,
    setInputValueHandler: (value: string) => void
}

const CalendarNet: React.FC<CalendarNetProps> = ({weeks, dateValue, setInputValueHandler}) => {
    const { colorMode } = useColorMode();

    return (
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
                    {item.map((unit: any, index) =>
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
                                '&:after': dateValue === unit.format('DD.MM.YYYY') ? {
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
    );
}

export default CalendarNet;