import React from "react";
import CalendarDayInfoItem from "./CalendarDayInfoItem";
import { AddIcon } from "@chakra-ui/icons";
import { Box } from "@chakra-ui/react";
import { Day } from "../../../../types/user";

type CalendarDayInfoItemsProps = {
    editableCalendar: boolean,
    selectedDayData: Day,
    setSelectedDayData: (value: Day) => void
}

const CalendarDayInfoItems: React.FC<CalendarDayInfoItemsProps> = ({
    selectedDayData,
    editableCalendar,
    setSelectedDayData
}) => {

    const onAddDayItemHandler = () => {
        setSelectedDayData({
            ...selectedDayData,
            dayUnits: [
                ...selectedDayData.dayUnits, {name: '', percent: ''}
            ]
        });
    }

    return (
        <Box mt='10px'>
            {selectedDayData.dayUnits.length ? selectedDayData.dayUnits.map((item, index) =>
                <CalendarDayInfoItem
                    key={`${item.name}_${index}`}
                    name={item.name}
                    percent={item.percent}
                    editableCalendar={editableCalendar}
                    index={index}
                    selectedDayData={selectedDayData}
                    setSelectedDayData={setSelectedDayData}
                />
            ) : ''}
            {editableCalendar ?
                <AddIcon
                    ml='5px'
                    cursor='pointer'
                    onClick={onAddDayItemHandler}
                /> : ''
            }
        </Box>
    );
}

export default CalendarDayInfoItems;