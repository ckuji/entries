import React, { useEffect, useRef } from "react";
import { Box } from "@chakra-ui/react";

type LogoutPopoverProps = {
    setShowLogoutPopoverHandler: (value: boolean) => void
}

const LogoutPopover: React.FC<LogoutPopoverProps> = ({
    setShowLogoutPopoverHandler
}) => {
    const popoverRef = useRef();

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

    return (
        <Box
            //@ts-ignore
            ref={popoverRef}
            position='absolute'
            top='30px'
            right='0'
            border='1px solid #fff'
            padding='10px 20px'
        >
            <Box>Выйти</Box>
        </Box>
    );
};

export default LogoutPopover;