import React from "react";
import { Text, Flex } from "@chakra-ui/react";
import { Link } from "@chakra-ui/next-js";

type LinksListItemProps = {
    editableUnits: boolean,
    name: string,
    addition: string
}

const LinksListItem: React.FC<LinksListItemProps> = ({editableUnits, name, addition}) => {
    return (
        <Flex
            minH={editableUnits ? '40px' : ''}
            flexWrap='wrap' m={`0 10px ${editableUnits ? '10px' : '0'} 0`}
        >
            <Text
                fontSize='sm'
                mr='10px'
                display='flex'
                alignItems='center'
                color='blue'
                textDecoration='underline'
                wordBreak='break-word'
            >
                <Link href={name}>{name}</Link>
            </Text>
            <Text fontSize='sm' display='flex' alignItems='center'>{addition}</Text>
        </Flex>
    );
}

export default LinksListItem;