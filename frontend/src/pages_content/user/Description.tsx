import React from "react";
import {Box, Button, Switch, Text, Textarea, useColorMode} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
    setEditableProfile,
    setEditableDescription,
    onChangeProfileDescription,
    createProfile
} from "../../state/slices/user";

type DescriptionProps = {
    userId: number
}

const Description: React.FC<DescriptionProps> = ({userId}) => {
    const dispatch = useAppDispatch();
    const { userData, editableProfile, editableDescription } = useAppSelector((state) => state.user);
    const { colorMode } = useColorMode();

    const onChangeEditPageHandler = () => {
        dispatch(setEditableProfile(!editableProfile));
        if(editableDescription) {
            dispatch(setEditableDescription(!editableDescription));
        }
    }

    const onChangeEditDescriptionHandler = () => {
        dispatch(setEditableDescription(!editableDescription));
    }

    const onChangeProfileDescriptionHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        dispatch(onChangeProfileDescription(e.target.value));
    }

    const onCreateProfileHandler = () => {
        dispatch(createProfile({text: userData.profile.description, userId }));
    }

    return (
        <Box>
            {userData?.owner ?
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
                        onChange={onChangeProfileDescriptionHandler}
                    /> :
                    <Text>
                        {userData?.profile?.description || 'Описание'}
                    </Text>
                }
                {editableProfile ?
                    <Box mt='10px'>
                        <Button
                            mr='10px'
                            variant='outline'
                            colorScheme={colorMode === 'light' ? 'cyan' : 'teal'}
                            onClick={onChangeEditDescriptionHandler}
                        >
                            <EditIcon />
                        </Button>
                        {editableDescription ?
                            <Button
                                variant='fill'
                                colorScheme={colorMode === 'light' ? 'cyan' : 'teal'}
                                isDisabled={userData.profile.description === userData.profile.initialDescription}
                                onClick={onCreateProfileHandler}
                            >
                                Сохранить
                            </Button> : ''
                        }
                    </Box>
                    : ''}
            </Box>
        </Box>
    );
}

export default Description;