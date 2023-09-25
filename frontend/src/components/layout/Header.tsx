import { Box, Switch, Text, useColorMode, Center, Button } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDisclosure } from '@chakra-ui/react';
import IntroModal from "../common/modals/IntroModal";
import axios from "axios";
import { BASE_URL } from "../../constants";
import { useAppDispatch } from "../../hooks";
import { FormErrorsKeyArray, StatusMessageConstuction, UserFields, UserValidationError } from "../../types/base";

const Header: React.FC = () => {
    const { colorMode, toggleColorMode } = useColorMode();
    const [login, setLogin] = useState<string | null>(null);
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

    const onChangeFormValues = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormValues({...formValues, [event.target.name]: event.target.value});
    };

    const onChangeFormValuesHandler = (event: React.ChangeEvent<HTMLInputElement>, field: string) => {
        onChangeFormValues(event);
        delete formErrors[field];
    }

    const toggleColorModeHandler = () => {
        toggleColorMode();
    };

    const setIsLoginModalHandler = () => {
        if(!isLoginModal) {
            setFormErrors({});
        }
        setIsLoginModal(!isLoginModal);
        setFormValues({ login: '', email: '', password: '' });
    }

    const onLoginModalHandler = async () => {
        // try {
        //     await axios.post(`${BASE_URL}/auth/login`, {
        //         login: formValues.login, password: formValues.password
        //     }, {
        //         withCredentials: true
        //     });
            
        // } catch (error) {
            
        // };
    };

    const registrationSuccessHandler = (login: string) => {
        setStatusMessage({status: 'success', message: `Пользователь ${login} успешно создан`});
        setTimeout(() => {
            setStatusMessage({status: '', message: ''});
            setIsLoginModalHandler();
            setRegistrationLoading(false);
        }, 2000);
    }

    const onRegistrationModalHandler = async () => {
        try {
            setRegistrationLoading(true);
            
            const response = await axios.post(`${BASE_URL}/user`, {
              login: formValues.login, password: formValues.password, email: formValues.email
            });
            registrationSuccessHandler(response.data.login);

        } catch (error: any) {
            if(error.response.data.statusCode === 409) {
                setStatusMessage({status: 'error', message: error.response.data.message});
                return;
            }

            let formErrorsHelper: FormErrorsKeyArray = {};

            error.response.data.message.map((item: UserValidationError) => {
                formErrorsHelper[item.property] = Object.values(item.constraints);
            });
            setFormErrors(formErrorsHelper);
            setRegistrationLoading(false);
        }
    };

    const fetchLoginedUser = async () => {
        // const {data} = await axios.get(`${BASE_URL}/auth/profile`, {withCredentials: true});
        // setLogin(data.login);
    };

    useEffect(() => {
        fetchLoginedUser();
    }, []);

    return (
        <Box h='60px' display='flex' justifyContent='space-between' alignItems='center'>
            <Text>Logo</Text>
            <Box display='flex' alignItems='center'>
                <Switch size='lg' onChange={toggleColorModeHandler} isChecked={colorMode === 'dark'}/>
                <Box marginLeft='10px' p='0 5px'>      
                    {login ? 
                        <Box display='flex' alignItems='center' gap='5px'>
                            <Text>{login}</Text>
                            <Center w='24px' h='24px' cursor='pointer'>
                                <svg width="14" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M1 1L7 8L13 1"
                                        stroke={colorMode === 'dark' ? 'var(--chakra-colors-gray-100)' : 'var(--chakra-colors-gray-700)'}
                                        strokeWidth="1"
                                    />
                                </svg>
                            </Center>
                            <Box rounded='full' w='45px' h='45px' bg='gray.300'></Box>
                        </Box>
                        :
                        <Text cursor='pointer' onClick={onOpen}>
                            Login{' '}&rarr;
                        </Text>
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
                statusMessage={statusMessage}
            />
        </Box>
    )
}

export default Header;