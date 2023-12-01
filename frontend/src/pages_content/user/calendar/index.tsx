import React, { useEffect, useState } from "react";
import { Box, Input } from "@chakra-ui/react";
import moment from "moment";
import { useAppSelector } from "../../../hooks";
import CalendarBody from "./CalendarBody";
import { MONTHS } from "../../../constants";

const Calendar: React.FC = () => {
    const userData = useAppSelector((state => state.user.userData));
    const [inputValue, setInputValue] = useState<string>('');
    const [weeks, setWeeks] = useState<string[][]>([]);
    const [month, setMonth] = useState<string>('');

    useEffect(() => {
        setInputValue(moment().format('DD.MM.YYYY'));
        calendarHandler(moment().format('DD.MM.YYYY'));
    }, []);

    const calendarHandler = (localInputValue: string) => {
        const selectedDate = moment(localInputValue, 'DD.MM.YYYY', true);
        const selectedDateIsValid = moment(localInputValue, 'DD.MM.YYYY', true).isValid();
        const daysInMonth = moment(localInputValue, 'DD.MM.YYYY', true).daysInMonth();
        
        if(selectedDateIsValid) {
            let weeksArray: any = [];
            let commonDatePart = '.' + selectedDate.format('MM') + '.' + selectedDate.format('YYYY');
            let week = [];

            for(let i = 1; i <= daysInMonth; i++) {
                let newI = i.toString().length === 1 ? ('0' + i) : i.toString();
                let date = moment((newI + commonDatePart), 'DD.MM.YYYY', true);

                week.push(date);
                if(Number(date.format('E')) % 7 === 0) {
                    weeksArray.push(week);
                    week = [];
                }
            }
            if(week.length) {
                weeksArray.push(week);
            }

            setMonth(MONTHS[selectedDate.format('MMMM')] + ', ' + selectedDate.format('YYYY'));
            setWeeks(weeksArray);
        }
    }

    const onChangeInputDateHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
        calendarHandler(event.target.value);
    }

    const setInputValueHandler = (value: string) => {
        setInputValue(value);
    }

    const changeMonthHandler = (type: string) => {
        if(type === 'increase') {
            let newInputValue = moment(inputValue, 'DD.MM.YYYY', true).add(1, 'months').format('DD.MM.YYYY');
            setInputValue(newInputValue);
            calendarHandler(newInputValue);
        }
        if(type === 'decrease') {
            let newInputValue = moment(inputValue, 'DD.MM.YYYY', true).subtract(1, 'months').format('DD.MM.YYYY');
            setInputValue(newInputValue);
            calendarHandler(newInputValue);
        }
    }
    
    return (
        <Box mt='30px'>
            <Input
                w='200px'
                placeholder='дд.мм.гггг'
                value={inputValue}
                onChange={onChangeInputDateHandler}
            />
            <CalendarBody
                weeks={weeks}
                setInputValueHandler={setInputValueHandler}
                month={month}
                changeMonthHandler={changeMonthHandler}
                inputValue={inputValue}
            />
        </Box>
    );
}

export default Calendar;