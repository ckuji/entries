import React from "react";
import { Input } from "@chakra-ui/react";

type LinkFormProps = {
    linkBaseValue: string,
    descriptionValue: string,
    onChangelinkHandler: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const LinkForm: React.FC<LinkFormProps> = ({linkBaseValue, descriptionValue, onChangelinkHandler}) => {
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
                value={linkBaseValue}
                onChange={(e) => onChangelinkHandler(e)}
                name='linkBase'
                placeholder="Введите ссылку"
            />
            <Input
                w='200px'
                type='text'
                value={descriptionValue}
                onChange={(e) => onChangelinkHandler(e)}
                name='description'
                placeholder="Введите описание"
            />
        </form>
    );
}

export default LinkForm;