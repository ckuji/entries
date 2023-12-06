import React, { useEffect, useState } from "react";
import { Box, Input } from "@chakra-ui/react";
import moment from "moment";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { MONTHS } from "../../../constants";
import { changeDay, resetEditableDayElements, setDateValue, setEditableCalendar } from "../../../state/slices/user";
import UserElementSettings from "../../../components/common/interaction/UserElementSettings";
import CalendarMonth from "./CalendarMonth";
import CalendarNet from "./CalendarNet";
import CalendarDayInfoDescription from "./calendar_day_info/CalendarDayInfoDescription";
import CalendarDayInfoItems from "./calendar_day_info/CalendarDayInfoItems";
import { CommonDay, DayExtended, DayUnitForSending } from "../../../types/user";
import CalendarDayInfoHours from "./calendar_day_info/CalendarDayInfoHours";

type CalendarProps = {
    userId: string
}

const Calendar: React.FC<CalendarProps> = ({userId}) => {
    const dispatch = useAppDispatch();
    const {
        userData,
        dateValue,
        editablePage,
        editableCalendar,
        editableDayElements,
        changeDayLoading
    } = useAppSelector(state => state.user);
    const [weeks, setWeeks] = useState<string[][]>([]);
    const [month, setMonth] = useState<string>('');
    const [successMessage, setSuccessMessage] = useState('');
    const [selectedDayData, setSelectedDayData] = useState<DayExtended>({
        date: '',
        description: '',
        hours: '',
        dayUnits: []
    });
    const [dayChangedFields, setDayChangedFields] = useState<CommonDay>({});

    useEffect(() => {
        if(editableDayElements.editableDescription || editableDayElements.editableDayUnits || editableDayElements.editableHours) {
            dispatch(resetEditableDayElements());
        }
        let localDayData = userData.days.find(item => item.date === dateValue);
        if(localDayData) {
            setSelectedDayData(localDayData);
        } else {
            setSelectedDayData({
                date: '',
                description: '',
                hours: '',
                dayUnits: []
            });
        }
    }, [userData, dateValue]);

    useEffect(() => {
        if(changeDayLoading === 'fulfilled') {
            setSuccessMessage('Изменения успешно сохранены');
            setTimeout(() => {
                setSuccessMessage('');
            }, 2000);
        }
    }, [changeDayLoading]);

    useEffect(() => {
        dispatch(setDateValue(moment().format('DD.MM.YYYY')));
        calendarHandler(moment().format('DD.MM.YYYY'));
    }, []);

    const calendarHandler = (localInputValue: string) => {
        const selectedDate = moment(localInputValue, 'DD.MM.YYYY', true);
        const selectedDateIsValid = moment(localInputValue, 'DD.MM.YYYY', true).isValid();
        const daysInMonth = moment(localInputValue, 'DD.MM.YYYY', true).daysInMonth();
        
        if(selectedDateIsValid) {
            let weeksArray: any = [];
            let commonDatePart = '.' + selectedDate.format('MM') + '.' + selectedDate.format('YYYY');
            let week = [];

            for(let i = 1; i <= daysInMonth; i++) {
                let newI = i.toString().length === 1 ? ('0' + i) : i.toString();
                let date = moment((newI + commonDatePart), 'DD.MM.YYYY', true);

                week.push(date);
                if(Number(date.format('E')) % 7 === 0) {
                    weeksArray.push(week);
                    week = [];
                }
            }
            if(week.length) {
                weeksArray.push(week);
            }

            setMonth(MONTHS[selectedDate.format('MMMM')] + ', ' + selectedDate.format('YYYY'));
            setWeeks(weeksArray);
        }
    }

    const onChangeInputDateHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setDateValue(event.target.value));
        calendarHandler(event.target.value);
    }

    const setInputValueHandler = (value: string) => {
        dispatch(setDateValue(value));
        if(editableCalendar) {
            dispatch(setEditableCalendar(false));
        } 
    }

    const changeMonthHandler = (type: string) => {
        if(type === 'increase') {
            let newInputValue = moment(dateValue, 'DD.MM.YYYY', true).add(1, 'months').format('DD.MM.YYYY');
            dispatch(setDateValue(newInputValue));
            calendarHandler(newInputValue);
        }
        if(type === 'decrease') {
            let newInputValue = moment(dateValue, 'DD.MM.YYYY', true).subtract(1, 'months').format('DD.MM.YYYY');
            dispatch(setDateValue(newInputValue));
            calendarHandler(newInputValue);
        }
    }

    const onChangeEditCalendarHandler = () => {
        if(!editableCalendar && !selectedDayData.date) {
            setSelectedDayData({
                date: dateValue,
                description: '',
                hours: '',
                dayUnits: []
            });
        }

        if(editableCalendar) {
            dispatch(resetEditableDayElements());
            let localDayData = userData.days.find(item => item.date === dateValue);
            if(!localDayData) {
                setSelectedDayData({
                    date: '',
                    description: '',
                    hours: '',
                    dayUnits: []
                });
            }
        }

        dispatch(setEditableCalendar(!editableCalendar));
    }

    const onClickSaveButton = () => {
        dispatch(changeDay(dayChangedFields));
    }

    useEffect(() => {
        let localDayData = userData.days.find(item => item.date === dateValue);
        let newFields: CommonDay = {
            userId: userId,
            date: dateValue
        };

        if(localDayData) {
            if(selectedDayData.description !== localDayData.description) {
                newFields['description'] = selectedDayData.description;
            } else if(newFields.description) {
                delete newFields['description'];
            }

            if(selectedDayData.hours !== localDayData.hours) {
                newFields['hours'] = +selectedDayData.hours;
            } else if(newFields.hours) {
                delete newFields['hours'];
            }

            let newItems: DayUnitForSending[] = [];
            selectedDayData.dayUnits?.map((item) => {
                localDayData?.dayUnits?.map((unit) => {
                    if((unit.name === item.name && unit.percent !== item.percent)) {
                        newItems.push({name: item.name, percent: +item.percent});
                    }
                });
                if(!localDayData?.dayUnits?.some((unit) => unit.name === item.name)) {
                    newItems.push({name: item.name, percent: +item.percent});
                }
            });

            localDayData.dayUnits?.map((item) => {
                if(!selectedDayData?.dayUnits?.some((unit) => unit.name === item.name)) {
                    newItems.push({name: item.name, percent: 0});
                }
            });
            if(newItems.length) {
                newFields['dayUnits'] = [...newItems];
            }

        } else {
            if(selectedDayData.description) {
                newFields['description'] = selectedDayData.description;
            } else if(newFields.description) {
                delete newFields['description'];
            }

            if(selectedDayData.hours) {
                newFields['hours'] = +selectedDayData.hours;
            } else if(newFields.hours) {
                delete newFields['hours'];
            }

            if(selectedDayData.dayUnits.length) {
                let newItems: DayUnitForSending[] = [];

                selectedDayData.dayUnits.map((item) => {
                    newFields.dayUnits?.map((unit) => {
                        if(unit.name === item.name && unit.percent !== +item.percent) {
                            newItems.push({name: item.name, percent: +item.percent});
                        }
                    });
                    if(!newFields?.dayUnits?.some((unit) => unit.name === item.name)) {
                        newItems.push({name: item.name, percent: +item.percent});
                    }
                });
                if(newItems.length) {
                    newFields['dayUnits'] = [...newItems];
                }
            } else if(newFields.dayUnits?.length) {
                delete newFields['dayUnits'];
            }
        }

        setDayChangedFields({...newFields});

    }, [selectedDayData, userData]);
    
    return (
        <Box mt='30px'>
            <Input
                w='200px'
                placeholder='дд.мм.гггг'
                value={dateValue}
                onChange={onChangeInputDateHandler}
            />
            <Box w='fit-content' mt='20px'>
                <CalendarMonth month={month} changeMonthHandler={changeMonthHandler} />
                <CalendarNet weeks={weeks} dateValue={dateValue} setInputValueHandler={setInputValueHandler} />
                <Box m='10px 0' minH='200px' border='1px solid #d6d6d6' fontSize='sm'>
                    {selectedDayData.date ?
                        <>
                            <CalendarDayInfoDescription
                                selectedDayData={selectedDayData}
                                editableCalendar={editableCalendar}
                                setSelectedDayData={setSelectedDayData}
                                editableDayElements={editableDayElements}
                            />
                            <CalendarDayInfoItems
                                selectedDayData={selectedDayData}
                                editableCalendar={editableCalendar}
                                setSelectedDayData={setSelectedDayData}
                            />
                            <CalendarDayInfoHours
                                selectedDayData={selectedDayData}
                                editableCalendar={editableCalendar}
                                setSelectedDayData={setSelectedDayData}
                                editableDayElements={editableDayElements}
                            />
                        </>
                        : <Box p='0 5px'>Список пуст</Box>
                    }
                </Box>
            </Box>
            <UserElementSettings
                editablePage={editablePage}
                onChangeEditElementHandler={onChangeEditCalendarHandler}
                editableElement={editableCalendar}
                isDisabledSaveButton={
                    !dayChangedFields.description && dayChangedFields.hours === undefined && !dayChangedFields.dayUnits?.length
                }
                onClickSaveButton={onClickSaveButton}
                successMessage={successMessage}
            />
        </Box>
    );
}

export default Calendar;