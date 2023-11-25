import { Box, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import UserElementSettings from "../UserElementSettings";
import { createLinkAndUpdateLinks, setEditableLinks, setEditedLinksItem } from "../../../state/slices/user";
import { LinkSample } from "../../../types/user";
import LinksItem from "./LinksItem";
import LinkForm from "./LinkForm";

type LinksProps = {
    userId: string
}

const Links: React.FC<LinksProps> = ({userId}) => {
    const dispatch = useAppDispatch();
    const { 
        userData,
        editablePage,
        editableLinks,
        createLinkLoading,
        editedLinksItem
    } = useAppSelector((state) => state.user);
    const [successMessage, setSuccessMessage] = useState('');
    const [newLinkValue, setNewLinkValue] = useState<LinkSample>({
        linkBase: '', description: ''
    });

    const onChangeEditLinksItemHandler = (editedLink: number) => {
        if(editedLink === editedLinksItem) {
            dispatch(setEditedLinksItem(null));
        } else {
            dispatch(setEditedLinksItem(editedLink));
        }
    }

    const onChangelinkHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewLinkValue({...newLinkValue, [e.target.name]: e.target.value});
    }

    const onChangeEditLinksHandler = () => {
        if(editableLinks) {
            dispatch(setEditedLinksItem(null));
        }
        dispatch(setEditableLinks(!editableLinks));
    }

    const onSaveDescriptionHandler = async () => {
        if(newLinkValue.linkBase) {
            dispatch(createLinkAndUpdateLinks({userId, linkBase: newLinkValue.linkBase, description: newLinkValue.description}));
        }
    }

    useEffect(() => {
        if(createLinkLoading === 'fulfilled') {
            setSuccessMessage('Изменения успешно сохранены');
            setNewLinkValue({linkBase: '', description: ''});
            setTimeout(() => {
                setSuccessMessage('');
            }, 2000);
        }
    }, [createLinkLoading]);

    return (
        <Box w='100%' mt='30px'>
            {userData.links?.map((item, index) => 
                <LinksItem
                    key={`${item.linkBase}_${index}`}
                    linkBase={item.linkBase}
                    description={item.description}
                    onChangeEditLinksItemHandler={onChangeEditLinksItemHandler}
                    index={index}
                    edited={editedLinksItem}
                    linkId={item.id}
                    userId={userId}
                />
            ) || 'Ссылок 0'}
            {editableLinks ?
                <Box>
                    <Text>Создать новую ссылку</Text>
                    <LinkForm
                        linkBaseValue={newLinkValue.linkBase}
                        descriptionValue={newLinkValue.description}
                        onChangelinkHandler={onChangelinkHandler}
                    />
                </Box>
                : ''
            }
            <UserElementSettings
                editablePage={editablePage}
                onChangeEditElementHandler={onChangeEditLinksHandler}
                editableElement={editableLinks}
                isDisabledSaveButton={
                    !newLinkValue.linkBase
                }
                onClickSaveButton={onSaveDescriptionHandler}
                successMessage={successMessage}
            />
        </Box>
    );
}

export default Links;