import React, { useEffect } from "react";
import { useRouter } from 'next/router';
import { Box, Spinner, Switch } from '@chakra-ui/react';
import { useAppDispatch, useAppSelector } from "../../hooks";
import { fetchUser, setUserRouterId, setEditablePage } from "../../state/slices/user";
import Description from "./Description";
import Links from "./Links";
import Experience from "./Experience";

const UserContent: React.FC = () => {
    const { fetchUserLoading, userData, editablePage } = useAppSelector((state) => state.user);
    const dispatch = useAppDispatch();
    const router: any = useRouter();

    const onChangeEditPageHandler = () => {
        dispatch(setEditablePage(!editablePage));
    }

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
                    {userData.owner ?
                        <Box
                            display='flex'
                            justifyContent='flex-end'
                            p='10px 0'
                        >
                            <Box mr='10px'>Редактировать страницу</Box>
                            <Switch size='lg' onChange={onChangeEditPageHandler} isChecked={editablePage}/>
                        </Box> : ''
                    }
                    <Description userId={router.query.id} />
                    <Links userId={router.query.id} />
                    <Experience userId={router.query.id} />
                </Box>
            }
        </Box>
    )
}

export default UserContent;