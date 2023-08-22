import React from "react";
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
    FormHelperText,
    FormErrorMessage
} from '@chakra-ui/react';

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

    return (
        <Modal isOpen={isOpen} onClose={onClose} trapFocus={false}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{isLoginModal ? 'Войти' : 'Зарегистрироваться'}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <form>
                        <FormControl isInvalid={isLoginError} mb='20px'>
                            <FormLabel>Login</FormLabel>
                            <Input type='text' value={formValues.login} onChange={onChangeFormValues} name='login' />
                            {!isLoginError ? (
                                <FormHelperText>
                                    Enter the login.
                                </FormHelperText>
                            ) : (
                                <FormErrorMessage>Login error</FormErrorMessage>
                            )}
                        </FormControl>

                        <FormControl isInvalid={isPasswordError} mb='20px'>
                            <FormLabel>Password</FormLabel>
                            <Input type='password' value={formValues.password} onChange={onChangeFormValues} name='password' />
                            {!isPasswordError ? (
                                <FormHelperText>
                                    Enter the password.
                                </FormHelperText>
                            ) : (
                                <FormErrorMessage>Password error</FormErrorMessage>
                            )}
                        </FormControl>

                        <FormControl isInvalid={isEmailError} mb='20px'>
                            <FormLabel>Email</FormLabel>
                            <Input type='email' value={formValues.email} onChange={onChangeFormValues} name='email' />
                            {!isEmailError ? (
                                <FormHelperText>
                                    Enter the email.
                                </FormHelperText>
                            ) : (
                                <FormErrorMessage>Email error</FormErrorMessage>
                            )}
                        </FormControl>
                    </form>
                </ModalBody>
                <ModalFooter>
                    <Button variant='outline' colorScheme='cyan' onClick={onConfirm} mr='15px'>
                        {isLoginModal ? 'Войти' : 'Зарегистрироваться'}
                    </Button>
                    <Button variant='fill' colorScheme='cyan' onClick={() => setIsLoginModal(!isLoginModal)}>
                        Перейти {isLoginModal ? 'к регистрации' : 'ко входу'}
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default IntroModal;