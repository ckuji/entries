import React, { useState, useEffect } from "react";
import { Text, Flex, Box, Button, useColorMode } from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import UnitForm from "./UnitForm";
import { IUnitsItem, IUnitsItemWithUnitId } from "../../../../types/user";
import SuccessNotice from "../../notices/SuccessNotice";

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
    onDeleteUnitHandler: (id: number) => void
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
    onDeleteUnitHandler
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

    return (
        <Flex className="links-item" mb={editableUnits ? '10px' : '0'}>
            {edited === index ? 
                <UnitForm
                    nameValue={unitsItemValuesLocal.name}
                    additionValue={unitsItemValuesLocal.addition}
                    onChangeUnitHandler={onChangeUnitHandler}
                /> 
                :
                <Flex h={editableUnits ? '40px' : ''}>
                    <Text fontSize='sm' mr='10px' display='flex' alignItems='center'>{unitsItemValuesLocal.name}</Text>
                    <Text fontSize='sm' display='flex' alignItems='center'>{unitsItemValuesLocal.addition}</Text>
                </Flex>
            }
            {editableUnits ?
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
                        ml='10px'
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