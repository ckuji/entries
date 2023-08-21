import React from "react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button
} from '@chakra-ui/react';

type IntroModalProps = {
    isOpen: boolean,
    onClose: () => void,
    isLoginModal: boolean,
    setIsLoginModal: (value: boolean) => void,
    onConfirm: () => void
}

const IntroModal: React.FC<IntroModalProps> = ({isOpen, onClose, isLoginModal, setIsLoginModal, onConfirm}) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} trapFocus={false}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{isLoginModal ? 'Войти' : 'Зарегистрироваться'}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    
                    
                    
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