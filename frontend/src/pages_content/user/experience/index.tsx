import { Box } from "@chakra-ui/react";
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
        const itemsForDisplay = userData.experience.map((item) => {
            let newItem: TransformExperience = {...item, addition: ''};
            delete newItem.percent;
            newItem.addition = item.percent.toString();

            return newItem;
        })

        setExperienceForDisplay(itemsForDisplay);
    }, [userData]);

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

    return (
        <Box w='100%' mt='30px'>
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