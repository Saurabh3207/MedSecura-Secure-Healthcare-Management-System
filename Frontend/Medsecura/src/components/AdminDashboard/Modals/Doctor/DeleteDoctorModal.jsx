import React, { useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalFooter, Button } from "@nextui-org/react";
import axios from "axios";
import { toast } from "react-toastify";

const DeleteDoctorModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [doctor, setDoctor] = useState(null);
  const [fetchButtonVisible, setFetchButtonVisible] = useState(true);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setDoctor(null); 
    setFetchButtonVisible(true);
  };

  const handleFetchDoctor = async () => {
    try {
      const response = await axios.post("http://localhost:3000/auth/get-doctor", { email });
      setDoctor(response.data.doctor);
      setFetchButtonVisible(false); 
    } catch (error) {
      console.error("Error fetching doctor:", error);
      toast.error("An error occurred while fetching doctor details. Please try again later.");
    }
  };

  const handleDeleteDoctor = async () => {
    if (!doctor) {
      toast.error("Please fetch doctor details first.");
      return;
    }
    const confirmDelete = window.confirm(`Are you sure you want to delete ${doctor.name}?`);
    if (confirmDelete) {
      try {
        const response = await axios.delete("http://localhost:3000/auth/delete-doctor", { data: { email } });
        console.log(response.data);
        toast.success("Doctor deleted successfully!");
        onClose();
      } catch (error) {
        console.error("Error deleting doctor:", error);
        toast.error("An error occurred while deleting doctor. Please try again later.");
      }
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader>Delete Doctor</ModalHeader>
        <div className="p-4">
          <p>Enter the email of the doctor you want to delete:</p>
          <input
            type="email"
            className="w-full border-gray-300 rounded-md p-2 mt-2"
            placeholder="Enter doctor's email"
            value={email}
            onChange={handleEmailChange}
          />
          {doctor && (
            <div className="mt-4">
              <p>Doctor Details:</p>
              <p>Name: {doctor.name}</p>
              <p>Email: {doctor.email}</p>
     
            </div>
          )}
        </div>
        <ModalFooter>
          {fetchButtonVisible && (
            <Button color="primary" onClick={handleFetchDoctor}>Fetch Doctor</Button>
          )}
          {doctor && (
            <>
              <Button color="danger" onClick={handleDeleteDoctor}>Delete</Button>
              <Button auto onClick={onClose}>Cancel</Button>
            </>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteDoctorModal;
