import React from "react";
import { Box, Flex, Input, Select } from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { DayExtended, ExpItem } from "../../../../types/user";

type CalendarDayInfoItemProps = {
    name: string,
    percent: string,
    editable: boolean,
    editableCalendar: boolean,
    index: number,
    selectedDayData: DayExtended,
    setSelectedDayData: (value: DayExtended) => void,
    experience: ExpItem[]
}

const CalendarDayInfoItem: React.FC<CalendarDayInfoItemProps> = ({
    name,
    percent,
    editable,
    editableCalendar,
    index,
    selectedDayData,
    setSelectedDayData,
    experience
}) => {
    
    const setHandler = (type: string, value: string | boolean) => {
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

    const setEditedItemHandler = () => {
        setHandler('editable', !editable);
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
            {editable ?
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
                        {experience.map((item, index) =>
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
                    <Box color={+percent >= 0 ? 'greenBand.600' : '#fa5b16'}>
                        {+percent >= 0 ? <>+</> : ''}
                        {percent}%
                    </Box>
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