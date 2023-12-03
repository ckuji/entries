import React, { useEffect, useState } from "react";
import CalendarDayInfoItem from "./CalendarDayInfoItem";
import { AddIcon } from "@chakra-ui/icons";
import { useAppDispatch, useAppSelector } from "../../../../hooks";
import { changeDay } from "../../../../state/slices/user";

type DayItem = {
    name: string,
    percent: string
}

type CalendarDayInfoItemsProps = {
    userId: string
}

const CalendarDayInfoItems: React.FC<CalendarDayInfoItemsProps> = ({userId}) => {
    const dispatch = useAppDispatch();
    // const [dayItems, setDayItems] = useState<DayItem[]>([]);

    // const onAddDayItemHandler = () => {
    //     setDayItems([...dayItems, {name: '', percent: ''}]);
    // }



    return (
        <>
            {/* {dayItems.map((item, index) =>
                <CalendarDayInfoItem
                    key={`${item.name}_${index}`}
                    name={item.name}
                    percent={item.percent}
                />
            )} */}
            
            <AddIcon
                ml='5px'
                cursor='pointer'
                // onClick={onAddDayItemHandler}
            />
        </>
    );
}

export default CalendarDayInfoItems;