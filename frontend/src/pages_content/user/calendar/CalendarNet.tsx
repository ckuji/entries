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
                        <Flex
                            flexDirection='column'
                            justifyContent='space-between'
                            key={`${unit.value}_${index}`}
                            boxSizing="content-box"
                            p='0 5px'
                            w={{base: '28px', sm: '50px'}}
                            h={{base: '40px', sm: '60px'}}
                            fontSize={{base: 'sm', sm: 'md'}}
                            bg={moment().format('DD.MM.YYYY') === unit.value.format('DD.MM.YYYY') ?
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
                                '&:after': dateValue === unit.value.format('DD.MM.YYYY') ? {
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
                            onClick={() => setInputValueHandler(unit.value.format('DD.MM.YYYY'))}
                        >
                            <Box>{unit.value.format('DD')}</Box>
                            {unit.lineAmountArray ?
                                <Flex m='0 0 5px 10px'>
                                    {unit.lineAmountArray.map((item: number, index: number) =>
                                        <Box
                                            key={`${item}_${index}`}
                                            h='8px'
                                            w={{base: '1px', sm: '3px'}}
                                            mr={{base: '2px', sm: '4px'}}
                                            bg={
                                                unit.lineAmountArray.length === 1 ? '#fa5b16' :
                                                unit.lineAmountArray.length === 2 ? '#f8a116' :
                                                unit.lineAmountArray.length === 3 ? '#f6e816' :
                                                unit.lineAmountArray.length === 4 ? '#6de523' :
                                                unit.lineAmountArray.length === 5 ? '#00d42e' : ''
                                            }
                                        ></Box>
                                    )}
                                </Flex> : ''
                            }
                        </Flex>
                    )}
                </Flex>
            )}
        </Box>
    );
}

export default CalendarNet;