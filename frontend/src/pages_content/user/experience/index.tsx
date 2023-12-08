import { Box, Switch, Flex } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { 
    setEditedExpItem,
    createExpItemAndUpdateExperience,
    updateExpItem,
    deleteExpItemAndUpdateExperience,
    setEditableExperience
} from "../../../state/slices/user";
import { IUnitsItem, IUnitsItemWithId, IUnitsItemWithUnitId, TransformExperience } from "../../../types/user";
import Units from "../../../components/common/interaction/units";

type ExperienceProps = {
    userId: string
}

const Experience: React.FC<ExperienceProps> = ({userId}) => {
    const dispatch = useAppDispatch();
    const { 
        userData,
        editablePage,
        editableExperience,
        createExpItemLoading,
        editedExpItem,
        updateExpItemLoading
    } = useAppSelector((state) => state.user);
    const [successMessage, setSuccessMessage] = useState('');
    const [newExpItemValue, setNewExpItemValue] = useState<IUnitsItem>({
        name: '', addition: ''
    });
    const [experienceForDisplay, setExperienceForDisplay] = useState<IUnitsItemWithId[]>([]);
    const [currentExperience, setCurrentExperience] = useState<boolean>(true);

    useEffect(() => {
        if(createExpItemLoading === 'fulfilled') {
            setSuccessMessage('Изменения успешно сохранены');
            setNewExpItemValue({name: '', addition: ''});
            setTimeout(() => {
                setSuccessMessage('');
            }, 2000);
        }
    }, [createExpItemLoading]);

    useEffect(() => {
        let dayExpSum: {[key: string]: number};
        if(currentExperience) {
            dayExpSum = userData.days.reduce((expItems, currentValue) => {
                let newExpItems: {[key: string]: number} = expItems;
                currentValue.dayUnits.map((item) => {
                    newExpItems[item.name] = newExpItems[item.name] ? (+newExpItems[item.name]! + +item.percent) : +item.percent;
                });
                return newExpItems;
            }, {} );
        }

        const itemsForDisplay = userData.experience.map((item) => {
            let newItem: TransformExperience = {...item, addition: ''};
            delete newItem.percent;
            if(currentExperience && dayExpSum[item.name]) {
                newItem.addition = (+item.percent + dayExpSum[item.name]!).toFixed().toString();
            } else {
                newItem.addition = item.percent.toString();
            }

            return newItem;
        });

        setExperienceForDisplay(itemsForDisplay);
    }, [userData, currentExperience]);

    const onChangeEditExpItemHandler = (editedItem: number) => {
        if(editedItem === editedExpItem) {
            dispatch(setEditedExpItem(null));
        } else {
            dispatch(setEditedExpItem(editedItem));
        }
    }

    const onChangeExpItemHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewExpItemValue({...newExpItemValue, [e.target.name]: e.target.value});
    }

    const onChangeEditExperienceHandler = () => {
        if(editableExperience) {
            dispatch(setEditedExpItem(null));
        }
        dispatch(setEditableExperience(!editableExperience));
    }

    const onSaveExpItemHandler = async () => {
        if(newExpItemValue.name) {
            dispatch(createExpItemAndUpdateExperience({userId, name: newExpItemValue.name, percent: +newExpItemValue.addition}));
        }
    }

    const onClickSaveExpItemButton = ({name, addition, unitId}: IUnitsItemWithUnitId) => {
        dispatch(updateExpItem({
            name: name,
            percent: +addition,
            id: unitId,
            userId: userId
        }));
    }

    const onDeleteExpItemHandler = (unitId: number) => {
        dispatch(deleteExpItemAndUpdateExperience({
            id: unitId,
            userId: userId
        }));
    }

    const toggleCurrentExperiencerHandler = () => {
        setCurrentExperience(!currentExperience);
    }

    return (
        <Box w='100%' mt='30px'>
            <Flex gap='20px' mb='10px'>
                <Box>На данный момент</Box>
                <Switch size='lg' onChange={toggleCurrentExperiencerHandler} isChecked={currentExperience}/>
            </Flex>
            <Units
                items={experienceForDisplay}
                onChangeEditUnitsItemHandler={onChangeEditExpItemHandler}
                editedLinksItem={editedExpItem}
                editableUnits={editableExperience}
                newUnitName={newExpItemValue.name}
                newUnitAddition={newExpItemValue.addition}
                onChangeUnitHandler={onChangeExpItemHandler}
                updateUnitLoading={updateExpItemLoading}
                onClickSaveUnitButton={onClickSaveExpItemButton}
                onDeleteUnitHandler={onDeleteExpItemHandler}
                editablePage={editablePage}
                onChangeEditElementHandler={onChangeEditExperienceHandler}
                onClickSaveButton={onSaveExpItemHandler}
                successMessage={successMessage}
                type='experience'
            />
        </Box>
    );
}

export default Experience;