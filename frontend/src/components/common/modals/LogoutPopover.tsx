import React, { useEffect, useRef } from "react";
import { Box } from "@chakra-ui/react";
import { useAppDispatch } from "../../../hooks";
import { logoutUser } from "../../../state/slices/base";

type LogoutPopoverProps = {
    setShowLogoutPopoverHandler: (value: boolean) => void
}

const LogoutPopover: React.FC<LogoutPopoverProps> = ({
    setShowLogoutPopoverHandler
}) => {
    const popoverRef = useRef();
    const dispatch = useAppDispatch();

    const outsideClickHandler = (e: MouseEvent) => {
        const path = e.composedPath && e.composedPath();

        //@ts-ignore
        if(!path.includes(popoverRef.current)) {
            setShowLogoutPopoverHandler(false);
        }
    };

    useEffect(() => {
        setTimeout(() => {
            document.body.addEventListener("click", outsideClickHandler);
        }, 10);

        return () => {
            document.body.removeEventListener("click", outsideClickHandler);
        };

    }, []);

    const logoutHandler = async () => {
        dispatch(logoutUser());
    };

    return (
        <Box
            //@ts-ignore
            ref={popoverRef}
            position='absolute'
            top='30px'
            right='0'
            borderWidth='1px'
            borderStyle='solid'
            borderColor='gray.300'
            bg='gray.100'
            _dark={{
                borderColor: 'gray.600',
                bg:'gray.700'
            }}
            padding='8px 20px'
        >
            <Box cursor='pointer' onClick={logoutHandler}>Выйти</Box>
        </Box>
    );
};

export default LogoutPopover;