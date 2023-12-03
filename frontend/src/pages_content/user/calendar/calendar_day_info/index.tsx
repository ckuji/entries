import { Box } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import CalendarDayInfoDescription from "./CalendarDayInfoDescription";
import CalendarDayInfoItems from "./CalendarDayInfoItems";
import { useAppSelector } from "../../../../hooks";
import { Day } from "../../../../types/user";

type CalendarDayInfoProps = {
    userId: string
}

const CalendarDayInfo: React.FC<CalendarDayInfoProps> = ({userId}) => {
    const {userData, dateValue} = useAppSelector((state => state.user));
    const [currentDayData, setCurrentDayData] = useState<Day | undefined>();

    useEffect(() => {
        let localDayData = userData.days.find(item => item.date === dateValue);
        if(localDayData) {
            setCurrentDayData(localDayData);
        }
    }, [userData, dateValue]);

    useEffect(() => {
        // dispatch(changeDay({
        //     userId: userId,
        //     date: '03.12.2023',
        //     description: 'new description2',
        //     hours: 6,
        //     dayUnits: [
        //         {name: 'html', percent: 0.1},
        //         {name: 'css', percent: 0.1},
        //         {name: 'react-testing-library', percent: 2.1}
        //     ]
        // }))
    }, []);

    return (
        <Box mt='10px' minH='200px' border='1px solid #d6d6d6' fontSize='sm'>
            <CalendarDayInfoDescription description={currentDayData?.description} />
            <CalendarDayInfoItems userId={userId} />
        </Box>
        
    );
}

export default CalendarDayInfo;