import React from "react";
import { Box } from "@chakra-ui/react";

type SuccessNoticeProps = {
    text: string
}

const SuccessNotice: React.FC<SuccessNoticeProps> = ({text}) => {
    return (
        <Box
            minH='40px'
            fontSize='sm'
            display='flex'
            alignItems='center'
            p='0 10px'
            borderWidth='1px'
            borderStyle='solid'
            borderColor='yellow.600'
            borderRadius='0 10px 10px 0'
        >{text}</Box>
    )
}

export default SuccessNotice;