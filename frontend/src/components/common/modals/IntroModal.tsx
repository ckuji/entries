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
    useColorMode,
    Text
} from '@chakra-ui/react';
import { ViewIcon } from "@chakra-ui/icons";
import { FormErrorsKeyArray, StatusMessageConstuction, UserFields } from "../../../types/base";

type IntroModalProps = {
    isOpen: boolean,
    onClose: () => void,
    isLoginModal: boolean,
    setIsLoginModalHandler: () => void,
    onConfirm: () => void,
    formValues: UserFields,
    onChangeFormValuesHandler: (event: React.ChangeEvent<HTMLInputElement>, field: string) => void,
    formErrors: FormErrorsKeyArray,
    registrationLoading: boolean,
    loginLoading: boolean,
    statusMessage: StatusMessageConstuction
}

const IntroModal: React.FC<IntroModalProps> = ({
    isOpen,
    onClose,
    isLoginModal,
    setIsLoginModalHandler,
    onConfirm,
    formValues,
    onChangeFormValuesHandler,
    formErrors,
    registrationLoading,
    loginLoading,
    statusMessage
}) => {
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
                        <FormControl isInvalid={!!formErrors['login']} mb='20px'>
                            <FormLabel>Логин</FormLabel>
                            <Input
                                type='text'
                                value={formValues.login}
                                onChange={(e) => onChangeFormValuesHandler(e, 'login')}
                                name='login'
                            />
                            {!!formErrors['login'] ? (
                                <FormErrorMessage>{formErrors['login'][0]}</FormErrorMessage>
                            ) : (
                                ""
                            )}
                        </FormControl>

                        <FormControl isInvalid={!!formErrors['password']} mb='20px'>
                            <FormLabel>Пароль</FormLabel>
                            <Box position='relative'>
                                <Input
                                    type={showPassword ? 'text' : 'password'}
                                    value={formValues.password}
                                    onChange={(e) => onChangeFormValuesHandler(e, 'password')}
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
                            {!!formErrors['password'] ? (
                                <FormErrorMessage>{formErrors['password'][0]}</FormErrorMessage>
                            ) : (
                                ""
                            )}
                        </FormControl>

                        {!isLoginModal ? (
                            <FormControl isInvalid={!!formErrors['email']} mb='20px'>
                                <FormLabel>Электронная почта</FormLabel>
                                <Input
                                    type='email'
                                    value={formValues.email}
                                    onChange={(e) => onChangeFormValuesHandler(e, 'email')}
                                    name='email'
                                />
                                {!!formErrors['email'] ? (
                                    <FormErrorMessage>{formErrors['email'][0]}</FormErrorMessage>
                                ) : (
                                    ""
                                )}
                            </FormControl>
                        ) : ("")}
                    </form>
                    <Box minHeight='30px'>
                        {statusMessage.status && statusMessage.message ?
                            (<Text
                                fontSize='sm'
                                color={
                                    statusMessage.status === 'success' ? "blue.400" :
                                    statusMessage.status === 'exist' ? "yellow.400" : ""
                                }
                            >{statusMessage.message}</Text>) : ('')
                        }
                    </Box>

                </ModalBody>
                <ModalFooter mb="10px">
                    <Button
                        variant='fill'
                        colorScheme={colorMode === 'light' ? 'cyan' : 'teal'}
                        isDisabled={registrationLoading || loginLoading}
                        onClick={onConfirm} mr='15px'
                    >
                        {isLoginModal ? 'Войти' : 'Зарегистрироваться'}
                    </Button>
                    <Button
                        variant='outlineSimple'
                        colorScheme='cyan'
                        isDisabled={registrationLoading || loginLoading}
                        onClick={setIsLoginModalHandler}
                    >
                        Перейти {isLoginModal ? 'к регистрации' : 'ко входу'}
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default IntroModal;