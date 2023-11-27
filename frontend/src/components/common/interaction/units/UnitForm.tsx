import React from "react";
import { Input } from "@chakra-ui/react";

type UnitFormProps = {
    nameValue: string,
    additionValue: string | number,
    onChangeUnitHandler: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const UnitForm: React.FC<UnitFormProps> = ({nameValue, additionValue, onChangeUnitHandler}) => {
    return (
        <form>
            <Input
                w='200px'
                mr='10px'
                color='blue'
                textDecoration='underline'
                _placeholder={{
                    'textDecoration': 'none'
                }}
                type='text'
                value={nameValue}
                onChange={(e) => onChangeUnitHandler(e)}
                name='name'
                placeholder="Введите значение"
            />
            <Input
                w='200px'
                type='text'
                value={additionValue}
                onChange={(e) => onChangeUnitHandler(e)}
                name='addition'
                placeholder="Дополнительно"
            />
        </form>
    );
}

export default UnitForm;