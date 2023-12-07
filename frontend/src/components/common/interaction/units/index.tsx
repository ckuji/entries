import React from 'react';
import { ExpItem, IUnitsItemWithId, IUnitsItemWithUnitId, Link } from '../../../../types/user';
import UnitsItem from './UnitsItem';
import { Box, Text } from "@chakra-ui/react";
import UnitForm from './UnitForm';
import UserElementSettings from '../UserElementSettings';

type UnitsProps = {
    items: IUnitsItemWithId[],
    onChangeEditUnitsItemHandler: (index: number) => void,
    editedLinksItem: number | null,
    editableUnits: boolean,
    newUnitName: string,
    newUnitAddition: string | number,
    onChangeUnitHandler: (event: React.ChangeEvent<HTMLInputElement>) => void,
    updateUnitLoading: string,
    onClickSaveUnitButton: (values: IUnitsItemWithUnitId) => void,
    onDeleteUnitHandler: (id: number) => void,
    editablePage: boolean,
    onChangeEditElementHandler: () => void,
    onClickSaveButton: () => void,
    successMessage: string,
    type: string
}

const Units: React.FC<UnitsProps> = ({
    items,
    onChangeEditUnitsItemHandler,
    editedLinksItem,
    editableUnits,
    newUnitName,
    newUnitAddition,
    onChangeUnitHandler,
    updateUnitLoading,
    onClickSaveUnitButton,
    onDeleteUnitHandler,
    editablePage,
    onChangeEditElementHandler,
    onClickSaveButton,
    successMessage,
    type
}) => {
    return (
        <>
            {items.length ? items.map((item, index) => 
                <UnitsItem
                    key={`${item.name}_${index}`}
                    name={item.name}
                    addition={item.addition}
                    onChangeEditUnitsItemHandler={onChangeEditUnitsItemHandler}
                    index={index}
                    edited={editedLinksItem}
                    unitId={item.id}
                    editableUnits={editableUnits}
                    updateUnitLoading={updateUnitLoading}
                    onClickSaveUnitButton={onClickSaveUnitButton}
                    onDeleteUnitHandler={onDeleteUnitHandler}
                    type={type}
                />
            ) : type === 'links' ? 'Ссылок 0' :
                type === 'experience' ? 'Навыков 0' : ''
            }
            {editableUnits ?
                <Box m='10px 0'>
                    <Text fontSize='sm' mb='5px'>{
                            type === 'links' ? 'Создать новую ссылку' :
                            type === 'experience' ? 'Добавить навык' : ''
                        }</Text>
                    <UnitForm
                        nameValue={newUnitName}
                        additionValue={newUnitAddition}
                        onChangeUnitHandler={onChangeUnitHandler}
                    />
                </Box>
                : ''
            }
            <UserElementSettings
                editablePage={editablePage}
                onChangeEditElementHandler={onChangeEditElementHandler}
                editableElement={editableUnits}
                isDisabledSaveButton={
                    !newUnitName
                }
                onClickSaveButton={onClickSaveButton}
                successMessage={successMessage}
            />
        </>
    );
}

export default Units;