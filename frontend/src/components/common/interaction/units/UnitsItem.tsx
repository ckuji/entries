import React, { useState, useEffect } from "react";
import { Flex, Box, Button, useColorMode } from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import UnitForm from "./UnitForm";
import { IUnitsItem, IUnitsItemWithUnitId } from "../../../../types/user";
import SuccessNotice from "../../notices/SuccessNotice";
import LinksListItem from "../../../../pages_content/user/links/LinksListItem";
import ExperienceListItem from "../../../../pages_content/user/experience/ExperienceListItem";

type UnitsItemProps = {
    name: string,
    addition: string,
    onChangeEditUnitsItemHandler: (index: number) => void,
    index: number,
    edited: null | number,
    unitId: number,
    editableUnits: boolean,
    updateUnitLoading: string,
    onClickSaveUnitButton: (values: IUnitsItemWithUnitId) => void,
    onDeleteUnitHandler: (id: number) => void,
    type: string
}

const UnitsItem: React.FC<UnitsItemProps> = ({
    name,
    addition,
    onChangeEditUnitsItemHandler,
    index,
    edited,
    unitId,
    editableUnits,
    updateUnitLoading,
    onClickSaveUnitButton,
    onDeleteUnitHandler,
    type
}) => {
    const [successMessage, setSuccessMessage] = useState('');
    const { colorMode } = useColorMode();
    const [unitsItemValuesLocal, setUnitsItemValuesLocal] = useState<IUnitsItem>({
        name: '', addition: ''
    });

    useEffect(() => {
        setUnitsItemValuesLocal({name, addition});
    }, [name, addition]);

    useEffect(() => {
        if(edited !== index && (unitsItemValuesLocal.name !== name || unitsItemValuesLocal.addition !== addition)) {
            setUnitsItemValuesLocal({name, addition});
        }
    }, [edited, index]);

    useEffect(() => {
        if(updateUnitLoading === 'fulfilled') {
            setSuccessMessage('Изменения успешно сохранены');
            setTimeout(() => {
                setSuccessMessage('');
            }, 2000);
        }
    }, [updateUnitLoading]);

    const onChangeUnitHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUnitsItemValuesLocal({...unitsItemValuesLocal, [event.target.name]: event.target.value});
    }

    const infoItem = () => {
        return (
            type === 'links' ?
                <LinksListItem
                    editableUnits={editableUnits}
                    name={unitsItemValuesLocal.name}
                    addition={unitsItemValuesLocal.addition}
                /> :
            type === 'experience' ?
                <ExperienceListItem
                    editableUnits={editableUnits}
                    name={unitsItemValuesLocal.name}
                    addition={unitsItemValuesLocal.addition}
                /> : ''
        );
    }

    return (
        <Flex
            gap='10px 0'
            className="list-item"
            flexWrap='wrap'
            alignItems={type === 'experience' ? 'center' : 'flex-start'}
            mb={editableUnits ? '10px' : 'none'}
        >
            {edited === index ?
                <UnitForm
                    nameValue={unitsItemValuesLocal.name}
                    additionValue={unitsItemValuesLocal.addition}
                    onChangeUnitHandler={onChangeUnitHandler}
                /> 
                :
                <>
                    {infoItem()}
                </>
            }
            {editableUnits ?
                <Box
                    display={edited === index ? 'flex': 'none'}
                    flexWrap='wrap'
                    gap='5px 10px'
                    sx={{
                        '.list-item:hover &': {
                            display: 'flex'
                        }
                    }}
                >
                    <Button
                        variant='outlineComplete'
                        colorScheme={colorMode === 'light' ? 'cyan' : 'teal'}
                        onClick={() => onChangeEditUnitsItemHandler(index)}
                    >
                        <EditIcon />
                    </Button>
                    <Button
                        variant='outlineComplete'
                        colorScheme='orange'
                        onClick={() => onDeleteUnitHandler(unitId)}
                    >
                        <DeleteIcon />
                    </Button>
                    <Button
                        variant='fill'
                        colorScheme={colorMode === 'light' ? 'cyan' : 'teal'}
                        isDisabled={name === unitsItemValuesLocal.name && addition === unitsItemValuesLocal.addition}
                        onClick={() => onClickSaveUnitButton({
                            name: unitsItemValuesLocal.name, addition: unitsItemValuesLocal.addition, unitId
                        })}
                    >
                        Сохранить
                    </Button>
                    {successMessage && edited === index ? <SuccessNotice text={successMessage} /> : ''}
                </Box> : ''
            }
        </Flex>
    );
}

export default UnitsItem;