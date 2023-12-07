import React, { useEffect } from "react";
import CalendarDayInfoItem from "./CalendarDayInfoItem";
import { AddIcon } from "@chakra-ui/icons";
import { Box } from "@chakra-ui/react";
import { DayExtended } from "../../../../types/user";
import { useAppSelector } from "../../../../hooks";

type CalendarDayInfoItemsProps = {
    editableCalendar: boolean,
    selectedDayData: DayExtended,
    setSelectedDayData: (value: DayExtended) => void
}

const CalendarDayInfoItems: React.FC<CalendarDayInfoItemsProps> = ({
    selectedDayData,
    editableCalendar,
    setSelectedDayData
}) => {
    const userData = useAppSelector((state => state.user.userData));

    const onAddDayItemHandler = () => {
        for(let i = 0; i <userData.experience.length; i++) {
            if(!selectedDayData.dayUnits.some((unit) => unit.name === userData.experience[i]?.name)) {
                setSelectedDayData({
                    ...selectedDayData,
                    dayUnits: [
                        ...selectedDayData.dayUnits, {name: userData.experience[i]?.name || '', percent: '', editable: true}
                    ]
                });
                break;
            }
        }
    }

    return (
        <Box mt='10px'>
            {selectedDayData.dayUnits.length ? selectedDayData.dayUnits.map((item, index) =>
                <CalendarDayInfoItem
                    key={`${item.name}_${index}`}
                    name={item.name}
                    percent={item.percent}
                    editable={item.editable}
                    editableCalendar={editableCalendar}
                    index={index}
                    selectedDayData={selectedDayData}
                    setSelectedDayData={setSelectedDayData}
                    experience={userData.experience}
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