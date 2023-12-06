import React from "react";
import { EditIcon } from "@chakra-ui/icons";
import { Box, Flex, Input } from "@chakra-ui/react";
import { DayExtended, EditableDayElements } from "../../../../types/user";
import { useAppDispatch } from "../../../../hooks";
import { setEditableDayElements } from "../../../../state/slices/user";

type CalendarDayInfoHoursProps = {
    editableCalendar: boolean,
    selectedDayData: DayExtended,
    setSelectedDayData: (value: DayExtended) => void,
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
            <Flex alignItems='center' gap='0 10px'>
                <Box h='fit-content'>Количество часов:</Box>
                {editableDayElements.editableHours ?
                    <>
                        <Input
                            w='60px'
                            h='30px'
                            placeholder='%'
                            value={selectedDayData.hours}
                            onChange={setHoursHandler}
                        />
                    </>
                    :
                    <Box>{selectedDayData.hours || 0}</Box>
                }
                {editableCalendar ?
                    <EditIcon cursor='pointer' onClick={setEditHoursHandler} /> : ''
                }
            </Flex>

        </Box>
    );
}

export default CalendarDayInfoHours;