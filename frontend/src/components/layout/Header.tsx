import { 
    Box,
    Switch,
    Text,
    useColorMode,
    Center,
} from "@chakra-ui/react";
import React, { useEffect, useState, useCallback } from "react";
import { useDisclosure, Spinner } from '@chakra-ui/react';
import IntroModal from "../common/modals/IntroModal";
import axios from "axios";
import { BASE_URL } from "../../constants";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { FormErrorsKeyArray, StatusMessageConstuction, UserFields, UserValidationError } from "../../types/base";
import LogoutPopover from "../common/modals/LogoutPopover";
import { fetchLoginedUser, loginUser } from "../../state/slices/base";

const Header: React.FC = () => {
    const { colorMode, toggleColorMode } = useColorMode();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [isLoginModal, setIsLoginModal] = useState(true);
    const dispatch = useAppDispatch();
    const [formValues, setFormValues] = useState<UserFields>({
        login: '', email: '', password: ''
    });
    const [formErrors, setFormErrors] = useState<FormErrorsKeyArray>({});
    const [registrationLoading, setRegistrationLoading] = useState<boolean>(false);
    const [statusMessage, setStatusMessage] = useState<StatusMessageConstuction>({
        status: '', message: ''
    });
    const [showLogoutPopover, setShowLogoutPopover] = useState<boolean>(false);
    const {fetchUserLoading, loginLoading, userName, logouted} = useAppSelector(state => state.base);

    const onChangeFormValues = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormValues({...formValues, [event.target.name]: event.target.value});
    };

    const onChangeFormValuesHandler = useCallback((event: React.ChangeEvent<HTMLInputElement>, field: string) => {
        onChangeFormValues(event);
        delete formErrors[field];
    }, []);

    const toggleColorModeHandler = () => {
        toggleColorMode();
    };

    const setIsLoginModalHandler = useCallback(() => {
        if(!isLoginModal) {
            setFormErrors({});
        }
        setIsLoginModal(!isLoginModal);
        setFormValues({login: '', email: '', password: ''});
    }, []);

    const setShowLogoutPopoverHandler = (value: boolean) => {
        setShowLogoutPopover(value);
    }

    const registrationHandler = (status: string, message: string) => {
        setStatusMessage({status, message});
        setTimeout(() => {
            setStatusMessage({status: '', message: ''});
            if(status === 'success') {
                setIsLoginModalHandler();
            }
            setRegistrationLoading(false);
        }, 2000);
    };

    const onLoginModalHandler = useCallback(() => {
        dispatch(loginUser(formValues));
    }, []);

    const onRegistrationModalHandler = useCallback(async () => {
        try {
            setRegistrationLoading(true);
            
            const response = await axios.post(`${BASE_URL}/user`, {
              login: formValues.login, password: formValues.password, email: formValues.email
            });
            registrationHandler('success', `Пользователь ${response.data.login} успешно создан`);

        } catch (error: any) {
            if(error.response.data.statusCode === 409) {
                registrationHandler('exist', error.response.data.message);
                return;
            }

            let formErrorsHelper: FormErrorsKeyArray = {};

            error.response.data.message.map((item: UserValidationError) => {
                formErrorsHelper[item.property] = Object.values(item.constraints);
            });
            setFormErrors(formErrorsHelper);
            setRegistrationLoading(false);
        }
    }, []);

    const fetchLoginedUserHandler = async () => {
        dispatch(fetchLoginedUser());
    };

    useEffect(() => {
        fetchLoginedUserHandler();
    }, []);

    useEffect(() => {
        if(loginLoading === 'fulfilled') {
            onClose();
            fetchLoginedUserHandler();
        }
        if(loginLoading === 'rejected') {
            registrationHandler('error', `Не верно введены логин или пароль`);
        }
    }, [loginLoading]);

    return (
        <Box h='60px' display='flex' justifyContent='space-between' alignItems='center'>
            <Text>Logo</Text>
            <Box display='flex' alignItems='center'>
                <Switch size='lg' onChange={toggleColorModeHandler} isChecked={colorMode === 'dark'}/>
                <Box marginLeft='10px' p='0 5px'>
                    {fetchUserLoading === "pending" ? 
                        <Spinner /> :
                        <>
                            {   
                                fetchUserLoading === "rejected" || (fetchUserLoading === "idle" && logouted) ?
                                    <Text cursor='pointer' onClick={onOpen}>
                                        Login{' '}&rarr;
                                    </Text>
                                :
                                fetchUserLoading === "fulfilled" ?
                                    <Box display='flex' alignItems='center' gap='5px'>
                                    <Text>{userName}</Text>
                                    <Box position='relative'>
                                        <Center
                                            w='24px'
                                            h='24px'
                                            cursor='pointer'
                                            transform={ showLogoutPopover ? 'rotate(180deg)' : 'none'}
                                            onClick={() => setShowLogoutPopoverHandler(true)}
                                        >
                                            <svg width="14" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M1 1L7 8L13 1"
                                                    stroke={colorMode === 'dark' ? 'var(--chakra-colors-gray-100)' : 'var(--chakra-colors-gray-700)'}
                                                    strokeWidth="1"
                                                />
                                            </svg>
                                        </Center>
                                        {showLogoutPopover ?
                                            <LogoutPopover setShowLogoutPopoverHandler={setShowLogoutPopoverHandler} /> : ''
                                        }
                                    </Box>
                                    <Box rounded='full' w='45px' h='45px' bg='gray.300'></Box>
                                </Box>
                                :
                                ''
                            }
                        </>
                    }       
                </Box>
            </Box>
            <IntroModal
                isOpen={isOpen}
                onClose={onClose}
                isLoginModal={isLoginModal}
                setIsLoginModalHandler={setIsLoginModalHandler}
                onConfirm={isLoginModal ? onLoginModalHandler : onRegistrationModalHandler}
                formValues={formValues}
                onChangeFormValuesHandler={onChangeFormValuesHandler}
                formErrors={formErrors}
                registrationLoading={registrationLoading}
                loginLoading={loginLoading}
                statusMessage={statusMessage}
            />
        </Box>
    );
};

export default Header;