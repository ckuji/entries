import { Box, Button, useColorMode } from "@chakra-ui/react";
import React from "react";
import { EditIcon } from "@chakra-ui/icons";
import SuccessNotice from "../../components/common/notices/SuccessNotice";

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
                <Box mt='10px' display='flex'>
                    <Button
                        variant='outline'
                        colorScheme={colorMode === 'light' ? 'cyan' : 'teal'}
                        onClick={onChangeEditElementHandler}
                    >
                        <EditIcon />
                    </Button>
                    {editableElement ?
                        <Button
                            ml='10px'
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