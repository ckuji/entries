import { Box } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { 
    createLinkAndUpdateLinks,
    deleteLinkAndUpdateLinks,
    setEditableLinks,
    setEditedLinksItem,
    updateLinksItem
} from "../../state/slices/user";
import { IUnitsItem, IUnitsItemWithId, IUnitsItemWithUnitId, TransformLinks } from "../../types/user";
import Units from "../../components/common/interaction/units";

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
        editedLinksItem,
        updateLinkLoading
    } = useAppSelector((state) => state.user);
    const [successMessage, setSuccessMessage] = useState('');
    const [newLinkValue, setNewLinkValue] = useState<IUnitsItem>({
        name: '', addition: ''
    });
    const [linksForDisplay, setLinksForDisplay] = useState<IUnitsItemWithId[]>([]);

    useEffect(() => {
        if(createLinkLoading === 'fulfilled') {
            setSuccessMessage('Изменения успешно сохранены');
            setNewLinkValue({name: '', addition: ''});
            setTimeout(() => {
                setSuccessMessage('');
            }, 2000);
        }
    }, [createLinkLoading]);

    useEffect(() => {
        const itemsForDisplay = userData.links.map((item) => {
            let newItem: TransformLinks = {...item, name: '', addition: ''};
            delete newItem.linkBase;
            delete newItem.description;
            newItem.name = item.linkBase;
            newItem.addition = item.description;

            return newItem;
        })

        setLinksForDisplay(itemsForDisplay);
    }, [userData]);

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

    const onSaveLinkHandler = async () => {
        if(newLinkValue.name) {
            dispatch(createLinkAndUpdateLinks({userId, linkBase: newLinkValue.name, description: newLinkValue.addition}));
        }
    }

    const onClickSaveLinkButton = ({name, addition, unitId}: IUnitsItemWithUnitId) => {
        dispatch(updateLinksItem({
            linkBase: name,
            description: addition,
            id: unitId,
            userId: userId
        }));
    }

    const onDeleteLinkHandler = (unitId: number) => {
        dispatch(deleteLinkAndUpdateLinks({
            id: unitId,
            userId: userId
        }));
    }

    return (
        <Box w='100%' mt='30px'>
            <Units
                items={linksForDisplay}
                onChangeEditUnitsItemHandler={onChangeEditLinksItemHandler}
                editedLinksItem={editedLinksItem}
                editableUnits={editableLinks}
                newUnitName={newLinkValue.name}
                newUnitAddition={newLinkValue.addition}
                onChangeUnitHandler={onChangelinkHandler}
                updateUnitLoading={updateLinkLoading}
                onClickSaveUnitButton={onClickSaveLinkButton}
                onDeleteUnitHandler={onDeleteLinkHandler}
                editablePage={editablePage}
                onChangeEditElementHandler={onChangeEditLinksHandler}
                onClickSaveButton={onSaveLinkHandler}
                successMessage={successMessage}
                type='links'
            />
        </Box>
    );
}

export default Links;