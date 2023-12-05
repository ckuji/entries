import React from "react";
import { EditIcon } from "@chakra-ui/icons";
import { Box, Textarea } from "@chakra-ui/react";
import { Day, EditableDayElements } from "../../../../types/user";
import { useAppDispatch } from "../../../../hooks";
import { setEditableDayElements } from "../../../../state/slices/user";

type CalendarDayInfoDescriptionProps = {
    editableCalendar: boolean,
    selectedDayData: Day,
    setSelectedDayData: (value: Day) => void,
    editableDayElements: EditableDayElements
}

const CalendarDayInfoDescription: React.FC<CalendarDayInfoDescriptionProps> = ({
    editableCalendar,
    setSelectedDayData,
    selectedDayData,
    editableDayElements
}) => {
    const dispatch = useAppDispatch();
    
    const setDescriptionHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setSelectedDayData({
            ...selectedDayData,
            description: event.target.value
        });
    }

    const setEditDescriptionHandler = () => {
        dispatch(setEditableDayElements({
            ...editableDayElements,
            editableDescription: !editableDayElements.editableDescription
        }));
    }

    return (
        <Box>
            <>
                {editableDayElements.editableDescription ?
                    <Textarea
                        borderRadius='none'
                        resize='none'
                        p='0 5px'
                        value={selectedDayData.description}
                        onChange={setDescriptionHandler}
                    /> :
                    <Box p='0 5px'>{selectedDayData.description}</Box>
                }
            </>
            {editableCalendar ?
                <EditIcon ml='5px' cursor='pointer' onClick={setEditDescriptionHandler} /> : ''
            }
        </Box>
    );
}

export default CalendarDayInfoDescription;