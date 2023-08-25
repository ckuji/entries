import React, { useState } from "react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    FormControl,
    FormLabel,
    Input,
    FormErrorMessage,
    Box,
    Center,
    useColorMode
} from '@chakra-ui/react';
import { ViewIcon } from "@chakra-ui/icons";

type IntroModalProps = {
    isOpen: boolean,
    onClose: () => void,
    isLoginModal: boolean,
    setIsLoginModal: (value: boolean) => void,
    onConfirm: () => void,
    formValues: {
        login: string,
        password: string,
        email: string
    },
    onChangeFormValues: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const IntroModal: React.FC<IntroModalProps> = ({
    isOpen,
    onClose,
    isLoginModal,
    setIsLoginModal,
    onConfirm,
    formValues,
    onChangeFormValues
}) => {
    const isLoginError = false;
    const isPasswordError = false;
    const isEmailError = false;
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const { colorMode } = useColorMode();

    return (
        <Modal isOpen={isOpen} onClose={onClose} trapFocus={false}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{isLoginModal ? 'Войти' : 'Зарегистрироваться'}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <form>
                        <FormControl isInvalid={isLoginError} mb='20px'>
                            <FormLabel>Логин</FormLabel>
                            <Input
                                type='text'
                                value={formValues.login}
                                onChange={onChangeFormValues}
                                name='login'
                            />
                            {!isLoginError ? (
                                ""
                            ) : (
                                <FormErrorMessage>Login error</FormErrorMessage>
                            )}
                        </FormControl>

                        <FormControl isInvalid={isPasswordError} mb='20px'>
                            <FormLabel>Пароль</FormLabel>
                            <Box position='relative'>
                                <Input
                                    type={showPassword ? 'text' : 'password'}
                                    value={formValues.password}
                                    onChange={onChangeFormValues}
                                    name='password'
                                />
                                <Center
                                    w='20px'
                                    h='20px'
                                    position='absolute'
                                    top='50%'
                                    transform='translateY(-50%)'
                                    right='10px'
                                    zIndex='1'
                                    cursor='pointer'
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    <ViewIcon/>
                                </Center>
                            </Box>
                            {!isPasswordError ? (
                                ""
                            ) : (
                                <FormErrorMessage>Password error</FormErrorMessage>
                            )}
                        </FormControl>

                        {!isLoginModal ? (
                            <FormControl isInvalid={isEmailError} mb='20px'>
                                <FormLabel>Электронная почта</FormLabel>
                                <Input
                                    type='email'
                                    value={formValues.email}
                                    onChange={onChangeFormValues}
                                    name='email'
                                />
                                {!isEmailError ? (
                                    ""
                                ) : (
                                    <FormErrorMessage>Email error</FormErrorMessage>
                                )}
                            </FormControl>
                        ) : ("")}
                        
                    </form>
                </ModalBody>
                <ModalFooter mb="10px">
                    <Button variant='outline' colorScheme={colorMode === 'light' ? 'cyan' : 'teal'} onClick={onConfirm} mr='15px'>
                        {isLoginModal ? 'Войти' : 'Зарегистрироваться'}
                    </Button>
                    <Button variant='fill' colorScheme={colorMode === 'light' ? 'cyan' : 'teal'} onClick={() => setIsLoginModal(!isLoginModal)}>
                        Перейти {isLoginModal ? 'к регистрации' : 'ко входу'}
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default IntroModal;