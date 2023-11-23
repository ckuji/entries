import React from "react";
import { Box } from "@chakra-ui/react";

type SuccessNoticeProps = {
    text: string
}

const SuccessNotice: React.FC<SuccessNoticeProps> = ({text}) => {
    return (
        <Box
            display='flex'
            alignItems='center'
            ml='10px'
            p='0 10px'
            borderWidth='1px'
            borderStyle='solid'
            borderColor='yellow.600'
            borderRadius='0 10px 10px 0'
        >{text}</Box>
    )
}

export default SuccessNotice;