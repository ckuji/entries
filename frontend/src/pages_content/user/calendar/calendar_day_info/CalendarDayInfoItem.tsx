import React from "react";
import { Flex, Input, Select } from "@chakra-ui/react";
import { useAppSelector } from "../../../../hooks";

type CalendarDayInfoItemProps = {
    name: string,
    percent: string
}

const CalendarDayInfoItem: React.FC<CalendarDayInfoItemProps> = ({name, percent}) => {
    const userData = useAppSelector((state => state.user.userData));

    return (
        <Flex m='10px 0 0 5px'>
            <Select
                w='200px'
                h='30px'
                fontSize='sm'
                mr='10px'
                sx={{'--input-padding': '5px'}}
            >
                {name ?
                    <option value={name} selected>{name}</option> : ''
                }
                {userData.experience.map((item, index) =>
                    <option
                        key={`${item.name}_${index}`}
                        value={item.name}
                        style={{
                            
                        }}
                    >{item.name}</option>
                )}
            </Select>
            <Input w='60px' h='30px' placeholder='%' />
        </Flex>
    );
}

export default CalendarDayInfoItem;