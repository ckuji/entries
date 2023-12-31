import React from "react";
import { Flex, Input } from "@chakra-ui/react";

type UnitFormProps = {
    nameValue: string,
    additionValue: string | number,
    onChangeUnitHandler: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const UnitForm: React.FC<UnitFormProps> = ({nameValue, additionValue, onChangeUnitHandler}) => {
    return (
        <form style={{
            marginRight: '10px',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '5px'
        }}>
            <Input
                w='200px'
                mr='10px'
                type='text'
                name='name'
                placeholder="Введите значение"
                value={nameValue}
                onChange={(e) => onChangeUnitHandler(e)}
            />
            <Input
                w='200px'
                type='text'
                name='addition'
                placeholder="Дополнительно"
                value={additionValue}
                onChange={(e) => onChangeUnitHandler(e)}
            />
        </form>
    );
}

export default UnitForm;