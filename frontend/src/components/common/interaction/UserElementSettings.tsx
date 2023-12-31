import { Box, Button, useColorMode } from "@chakra-ui/react";
import React from "react";
import SuccessNotice from "../notices/SuccessNotice";
import { EditIcon } from "@chakra-ui/icons";

type UserElementSettingsProps = {
    editablePage: boolean
    onChangeEditElementHandler: () => void
    editableElement: boolean
    isDisabledSaveButton: boolean
    onClickSaveButton: () => void
    successMessage: string
}

const UserElementSettings: React.FC<UserElementSettingsProps> = ({
    editablePage,
    onChangeEditElementHandler,
    editableElement,
    isDisabledSaveButton,
    onClickSaveButton,
    successMessage
}) => {
    const { colorMode } = useColorMode();

    return (
        <>
            {editablePage ?
                <Box mt={editableElement ? '0px' : '10px'} display='flex' gap='10px' flexWrap='wrap'>
                    <Button
                        variant='outlineComplete'
                        colorScheme={colorMode === 'light' ? 'cyan' : 'teal'}
                        onClick={onChangeEditElementHandler}
                    >
                        <EditIcon />
                    </Button>                    
                    {editableElement ?
                        <Button
                            variant='fill'
                            colorScheme={colorMode === 'light' ? 'cyan' : 'teal'}
                            isDisabled={isDisabledSaveButton}
                            onClick={onClickSaveButton}
                        >
                            Сохранить
                        </Button> : ''
                    }
                    {successMessage ? <SuccessNotice text={successMessage} /> : ''}
                </Box>
                : ''}
        </>
    );
}

export default UserElementSettings;