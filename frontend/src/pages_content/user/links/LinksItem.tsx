import React, { useState, useEffect } from "react";
import { Text, Flex, Box, Button, useColorMode } from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import LinkForm from "./LinkForm";
import { LinkSample } from "../../../types/user";
import { deleteLinkAndUpdateLinks, updateLinksItem } from "../../../state/slices/user";
import SuccessNotice from "../../../components/common/notices/SuccessNotice";

type LinksItemProps = {
    linkBase: string,
    description: string,
    onChangeEditLinksItemHandler: (link: number) => void,
    index: number,
    edited: null | number,
    linkId?: number,
    userId: string,
}

const LinksItem: React.FC<LinksItemProps> = ({
    linkBase,
    description,
    onChangeEditLinksItemHandler,
    index,
    edited,
    linkId,
    userId,
}) => {
    const dispatch = useAppDispatch();
    const { editableLinks, updateLinkLoading, editablePage } = useAppSelector((state) => state.user);
    const [successMessage, setSuccessMessage] = useState('');
    const { colorMode } = useColorMode();
    const [linkValuesLocal, setLinkValuesLocal] = useState<LinkSample>({
        linkBase: '', description: ''
    });

    useEffect(() => {
        setLinkValuesLocal({linkBase, description});
    }, [linkBase, description]);

    useEffect(() => {
        if(edited !== index && (linkValuesLocal.linkBase !== linkBase || linkValuesLocal.description !== description)) {
            setLinkValuesLocal({linkBase, description});
        }
    }, [edited, index]);

    useEffect(() => {
        if(updateLinkLoading === 'fulfilled') {
            setSuccessMessage('Изменения успешно сохранены');
            setTimeout(() => {
                setSuccessMessage('');
            }, 2000);
        }
    }, [updateLinkLoading]);

    const onChangelinkHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLinkValuesLocal({...linkValuesLocal, [event.target.name]: event.target.value});
    }

    const onClickSaveButton = () => {
        dispatch(updateLinksItem({
            linkBase: linkValuesLocal.linkBase,
            description: linkValuesLocal.description,
            id: linkId || 0,
            userId: userId
        }));
    }

    const onDeleteLinkHandler = () => {
        dispatch(deleteLinkAndUpdateLinks({
            id: linkId || 0,
            userId: userId
        }));
    }

    return (
        <Flex className="links-item" mb={editableLinks ? '10px' : '0'}>
            {edited === index ? 
                <LinkForm
                    linkBaseValue={linkValuesLocal.linkBase}
                    descriptionValue={linkValuesLocal.description}
                    onChangelinkHandler={onChangelinkHandler}
                /> 
                :
                <Flex h={editableLinks ? '40px' : ''}>
                    <Text fontSize='sm' mr='10px' display='flex' alignItems='center'>{linkValuesLocal.linkBase}</Text>
                    <Text fontSize='sm' display='flex' alignItems='center'>{linkValuesLocal.description}</Text>
                </Flex>
            }
            {editableLinks ?
                <Box
                    ml='10px'
                    display={edited === index ? 'flex': 'none'}
                    sx={{
                        '.links-item:hover &': {
                            display: 'flex'
                        }
                    }}
                >
                    <Button
                        mr='10px'
                        variant='outlineComplete'
                        colorScheme={colorMode === 'light' ? 'cyan' : 'teal'}
                        onClick={() => onChangeEditLinksItemHandler(index)}
                    >
                        <EditIcon />
                    </Button>
                    <Button
                        variant='outlineComplete'
                        colorScheme='orange'
                        onClick={onDeleteLinkHandler}
                    >
                        <DeleteIcon />
                    </Button>
                    <Button
                        ml='10px'
                        variant='fill'
                        colorScheme={colorMode === 'light' ? 'cyan' : 'teal'}
                        isDisabled={linkBase === linkValuesLocal.linkBase && description === linkValuesLocal.description}
                        onClick={onClickSaveButton}
                    >
                        Сохранить
                    </Button>
                    {successMessage && edited === index ? <SuccessNotice text={successMessage} /> : ''}
                </Box> : ''
            }
        </Flex>
    );
}

export default LinksItem;