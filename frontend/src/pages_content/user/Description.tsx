import React, {useEffect, useState} from "react";
import {Box, Text, Textarea} from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
    setEditableDescription,
    onChangeProfileDescription,
    createDescription,
    updateDescription
} from "../../state/slices/user";
import UserElementSettings from "./UserElementSettings";

type DescriptionProps = {
    userId: string
}

const Description: React.FC<DescriptionProps> = ({userId}) => {
    const dispatch = useAppDispatch();
    const { userData, editablePage, editableDescription, changeDescriptionLoading } = useAppSelector((state) => state.user);
    const [successMessage, setSuccessMessage] = useState('');

    const onChangeEditDescriptionHandler = () => {
        dispatch(setEditableDescription(!editableDescription));
    }

    const onChangeDescriptionHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        dispatch(onChangeProfileDescription(e.target.value));
    }

    const onSaveDescriptionHandler = () => {
        if(userData.emptyInitialProfile) {
            dispatch(createDescription({text: userData.profile.description, userId }));
        } else {
            dispatch(updateDescription({text: userData.profile.description, userId }))
        }
    }

    useEffect(() => {
        if(changeDescriptionLoading === 'fulfilled') {
            setSuccessMessage('Изменения успешно сохранены');
            dispatch(setEditableDescription(false));
            setTimeout(() => {
                setSuccessMessage('');
            }, 2000);
        }
    }, [changeDescriptionLoading]);

    return (
        <Box mt='10px'>
            {editableDescription ?
                <Textarea
                    placeholder='Введите описание профиля'
                    value={userData.profile.description}
                    onChange={onChangeDescriptionHandler}
                /> :
                <Text fontSize='sm'>
                    {userData?.profile?.description || 'Описание не заполнено'}
                </Text>
            }
            <UserElementSettings
                editablePage={editablePage}
                onChangeEditElementHandler={onChangeEditDescriptionHandler}
                editableElement={editableDescription}
                isDisabledSaveButton={
                    userData.profile.description === userData.profile.initialDescription ||
                    changeDescriptionLoading === 'pending'
                }
                onClickSaveButton={onSaveDescriptionHandler}
                successMessage={successMessage}
            />
        </Box>
    );
}

export default Description;