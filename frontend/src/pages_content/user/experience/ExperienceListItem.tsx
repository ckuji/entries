import React from "react";
import { Text, Flex, Box } from "@chakra-ui/react";

type ExperienceListItemProps = {
    editableUnits: boolean,
    name: string,
    addition: string
}

const ExperienceListItem: React.FC<ExperienceListItemProps> = ({editableUnits, name, addition}) => {
    return (
        <Box
            w={{base: '100%', sm: '50%'}}
            minH={editableUnits ? '40px' : '30px'}
            mr='10px'
            display={{md: 'flex'}}
        >
            <Text
                fontSize='sm'
                mr='10px'
                display='flex'
                alignItems='center'
                w='150px'
            >{name}</Text>
            <Flex
                alignItems='center'
                w='100%'
                flex='1 1 0'
            >
                <Box
                    h='20px'
                    w={`${addition}%`}
                    bgGradient='linear(to-r, greenBand.600, greenBand.700)'
                ></Box>
                <Box ml='5px' w='50px'>{addition}%</Box>
            </Flex>
        </Box>
    );
}

export default ExperienceListItem;