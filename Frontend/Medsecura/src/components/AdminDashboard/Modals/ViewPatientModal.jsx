import react from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Input, Button } from "@nextui-org/react";

const AddPatientModal = ({ isOpen, onClose, size }) => {

return (
    <Modal isOpen={isOpen} onClose={onClose} size={size}>
        <ModalHeader>View Patient</ModalHeader>
        <ModalContent>
            <ModalBody>
                {/* Add your content here */}
            </ModalBody>
            <ModalFooter>
                <Button auto onClick={onClose}>Close</Button>
            </ModalFooter>
        </ModalContent>
    </Modal>
);
}



export default AddPatientModal;