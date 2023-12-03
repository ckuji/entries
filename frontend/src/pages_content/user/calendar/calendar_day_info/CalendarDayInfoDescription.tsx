import { EditIcon } from "@chakra-ui/icons";
import { Box, Textarea } from "@chakra-ui/react";
import React, { useState } from "react";

type CalendarDayInfoDescriptionProps = {
    description?: string
}

const CalendarDayInfoDescription: React.FC<CalendarDayInfoDescriptionProps> = ({description}) => {
    const [editDescription, setEditDescription] = useState(false);

    const setEditDescriptionHandler = () => {
        setEditDescription(!editDescription);
    }

    return (
        <Box>
            <>
                {editDescription ?
                    <Textarea borderRadius='none' resize='none' p='0 5px' /> :
                    <Box p='0 5px'>{description}</Box>
                }
            </>
            <EditIcon ml='5px' cursor='pointer' onClick={setEditDescriptionHandler} />
        </Box>
    );
}

export default CalendarDayInfoDescription;