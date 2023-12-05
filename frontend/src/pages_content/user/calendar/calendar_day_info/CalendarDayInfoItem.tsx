import React, { useState } from "react";
import { Box, Flex, Input, Select } from "@chakra-ui/react";
import { useAppSelector } from "../../../../hooks";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Day } from "../../../../types/user";

type CalendarDayInfoItemProps = {
    name: string,
    percent: string,
    editableCalendar: boolean,
    index: number,
    selectedDayData: Day,
    setSelectedDayData: (value: Day) => void
}

const CalendarDayInfoItem: React.FC<CalendarDayInfoItemProps> = ({
    name,
    percent,
    editableCalendar,
    index,
    selectedDayData,
    setSelectedDayData
}) => {
    const userData = useAppSelector((state => state.user.userData));
    const [editedItem, setEditedItem] = useState<boolean>(false);

    const setEditedItemHandler = () => {
        setEditedItem(!editedItem);
    }

    const setHandler = (type: string, value: string) => {
        let updatedUnits = selectedDayData.dayUnits.map((item, idx) => {
            if(idx === index) {
                return {...item, [type]: value}
            } else {
                return item;
            }
        });

        setSelectedDayData({
            ...selectedDayData,
            dayUnits: updatedUnits
        });
    }

    const removeHandler = () => {
        const removeItemArray = [...selectedDayData.dayUnits];
        removeItemArray.splice(index, 1);

        setSelectedDayData({
            ...selectedDayData,
            dayUnits: removeItemArray
        });
    }

    const onSelectExpItemHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
        if(selectedDayData.dayUnits.some(item => item.name === event.target.value)) {
            removeHandler();
        } else {
            setHandler('name', event.target.value);
        }
    }

    const setPercentValueHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setHandler('percent', event.target.value);
    }
    
    return (
        <Flex m='5px 0 0 5px' alignItems='center' gap='10px'>
            {editedItem ?
                <>
                    <Select
                        w='200px'
                        h='30px'
                        fontSize='sm'
                        mr='10px'
                        sx={{'--input-padding': '5px'}}
                        defaultValue={name}
                        onChange={onSelectExpItemHandler}
                    >
                        {userData.experience.map((item, index) =>
                            <option
                                key={`${item.name}_${index}`}
                                value={item.name}
                            >{item.name}</option>
                        )}
                    </Select>
                    <Input
                        w='60px'
                        h='30px'
                        placeholder='%'
                        value={percent}
                        onChange={setPercentValueHandler}
                    />
                </> :
                <>
                    <Box>{name}</Box>
                    <Box color='greenBand.600'>+{percent}%</Box>
                </>
            }
            {editableCalendar ?
                <>
                    <EditIcon cursor='pointer' onClick={setEditedItemHandler} />
                    <DeleteIcon cursor='pointer' onClick={removeHandler} />
                </> : ''
            }
        </Flex>
    );
}

export default CalendarDayInfoItem;