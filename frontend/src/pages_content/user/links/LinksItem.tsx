import React, {useState} from "react";
import { Text, Flex, Box } from "@chakra-ui/react";
import { Link } from "../../../types/user";
import { useAppSelector } from "../../../hooks";
import LinkForm from "./LinkForm";

const LinksItem: React.FC<Link> = ({linkBase, description}) => {
    const { editableLinks } = useAppSelector((state) => state.user);

    return (
        <Box>
            {editableLinks ? 
                <LinkForm
                    linkBaseValue={linkBase}
                    descriptionValue={description}
                    onChangelinkHandler={() => {}}
                /> :
                <Flex>
                    <Text fontSize='sm' mr='10px'>{linkBase}</Text>
                    <Text fontSize='sm'>{description}</Text>
                </Flex>
            }
        </Box>
    );
}

export default LinksItem;