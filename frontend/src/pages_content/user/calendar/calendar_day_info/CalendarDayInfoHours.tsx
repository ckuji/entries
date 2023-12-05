import React from "react";
import { EditIcon } from "@chakra-ui/icons";
import { Box, Flex, Input, Text } from "@chakra-ui/react";
import { Day, EditableDayElements } from "../../../../types/user";
import { useAppDispatch } from "../../../../hooks";
import { setEditableDayElements } from "../../../../state/slices/user";

type CalendarDayInfoHoursProps = {
    editableCalendar: boolean,
    selectedDayData: Day,
    setSelectedDayData: (value: Day) => void,
    editableDayElements: EditableDayElements
}

const CalendarDayInfoHours: React.FC<CalendarDayInfoHoursProps> = ({
    editableCalendar,
    setSelectedDayData,
    selectedDayData,
    editableDayElements
}) => {
    const dispatch = useAppDispatch();
    
    const setHoursHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedDayData({
            ...selectedDayData,
            hours: event.target.value
        });
    }

    const setEditHoursHandler = () => {
        dispatch(setEditableDayElements({
            ...editableDayElements,
            editableHours: !editableDayElements.editableHours
        }));
    }

    return (
        <Box m='10px 0 0 5px'>
            <Flex alignItems='center'>
                <Box h='fit-content' mr='10px'>Количество часов:</Box>
                {editableDayElements.editableHours ?
                    <Input
                        w='60px'
                        h='30px'
                        placeholder='%'
                        value={selectedDayData.hours}
                        onChange={setHoursHandler}
                    />
                    :
                    <Box p='0 5px'>{selectedDayData.hours}</Box>
                }
            </Flex>
            {editableCalendar ?
                <EditIcon ml='5px' cursor='pointer' onClick={setEditHoursHandler} /> : ''
            }
        </Box>
    );
}

export default CalendarDayInfoHours;