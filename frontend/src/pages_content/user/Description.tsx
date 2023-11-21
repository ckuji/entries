import React, {useEffect, useState} from "react";
import {Box, Button, Switch, Text, Textarea, useColorMode} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
    setEditableProfile,
    setEditableDescription,
    onChangeProfileDescription,
    createDescription,
    updateDescription
} from "../../state/slices/user";

type DescriptionProps = {
    userId: string
}

const Description: React.FC<DescriptionProps> = ({userId}) => {
    const dispatch = useAppDispatch();
    const { userData, editableProfile, editableDescription, changeDescriptionLoading } = useAppSelector((state) => state.user);
    const { colorMode } = useColorMode();
    const [successMessage, setSuccessMessage] = useState('');

    const onChangeEditPageHandler = () => {
        dispatch(setEditableProfile(!editableProfile));
        if(editableDescription) {
            dispatch(setEditableDescription(!editableDescription));
        }
    }

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
        <Box>
            {userData.owner ?
                <Box
                    display='flex'
                    justifyContent='flex-end'
                    p='10px 0'
                >
                    <Box mr='10px'>Редактировать страницу</Box>
                    <Switch size='lg' onChange={onChangeEditPageHandler} isChecked={editableProfile}/>
                </Box> : ''
            }
            <Box mt='10px'>
                {editableDescription ?
                    <Textarea
                        placeholder='Введите описание профиля'
                        value={userData.profile.description}
                        onChange={onChangeDescriptionHandler}
                    /> :
                    <Text>
                        {userData?.profile?.description || 'Описание'}
                    </Text>
                }
                {editableProfile ?
                    <Box mt='10px' display='flex'>
                        <Button
                            variant='outline'
                            colorScheme={colorMode === 'light' ? 'cyan' : 'teal'}
                            onClick={onChangeEditDescriptionHandler}
                        >
                            <EditIcon />
                        </Button>
                        {editableDescription ?
                            <Button
                                ml='10px'
                                variant='fill'
                                colorScheme={colorMode === 'light' ? 'cyan' : 'teal'}
                                isDisabled={
                                    userData.profile.description === userData.profile.initialDescription ||
                                    changeDescriptionLoading === 'pending'
                                }
                                onClick={onSaveDescriptionHandler}
                            >
                                Сохранить
                            </Button> : ''
                        }
                        {successMessage ?
                            <Box
                                display='flex'
                                alignItems='center'
                                ml='10px'
                                p='0 10px'
                                borderWidth='1px'
                                borderStyle='solid'
                                borderColor='yellow.600'
                                borderRadius='0 10px 10px 0'
                            >{successMessage}</Box> : ''
                        }
                    </Box>
                    : ''}
            </Box>
        </Box>
    );
}

export default Description;