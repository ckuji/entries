import React, { useEffect } from "react";
import { useRouter } from 'next/router';
import { Box, Spinner } from '@chakra-ui/react';
import { useAppDispatch, useAppSelector } from "../../hooks";
import { fetchUser, setUserRouterId } from "../../state/slices/user";
import Description from "./Description";

const UserContent: React.FC = () => {
    const { fetchUserLoading, userData } = useAppSelector((state) => state.user);
    const dispatch = useAppDispatch();
    const router: any = useRouter();

    useEffect(() => {
        if(router.query.id) {
            dispatch(fetchUser(router.query.id));
            dispatch(setUserRouterId(router.query.id));  
        }
    }, [router]);

    return (
        <Box w='100%'>
            {
                fetchUserLoading === 'idle' || fetchUserLoading === 'pending' ?
                <Spinner /> :
                fetchUserLoading === 'rejected' ?
                <Box>Пользователь не найден</Box> :
                <Box>
                    <Description userId={router.query.id} />
                    <Box mt='30px'>Ссылки</Box>
                    <Box>Знания</Box>
                </Box>
            }
        </Box>
    )
}

export default UserContent;