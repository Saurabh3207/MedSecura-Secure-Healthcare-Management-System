import React, { useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalFooter, Button } from "@nextui-org/react";
import axios from "axios";
import { toast } from "react-toastify";

const DeletePatientModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [patient, setPatient] = useState(null);
  const [fetchButtonVisible, setFetchButtonVisible] = useState(true);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setPatient(null); 
    setFetchButtonVisible(true); 
  };

  const handleFetchPatient = async () => {
    try {
      const response = await axios.post("http://localhost:3000/auth/get-patient", { email });
      setPatient(response.data.patient);
      setFetchButtonVisible(false); 
    } catch (error) {
      console.error("Error fetching patient:", error);
      toast.error("An error occurred while fetching patient details. Please try again later.");
    }
  };

  const handleDeletePatient = async () => {
    if (!patient) {
      toast.error("Please fetch patient details first.");
      return;
    }
    const confirmDelete = window.confirm(`Are you sure you want to delete ${patient.name}?`);
    if (confirmDelete) {
      try {
        const response = await axios.delete("http://localhost:3000/auth/delete-patient", { data: { email } });
        console.log(response.data);
        toast.success("Patient deleted successfully!");
        onClose(); 
      } catch (error) {
        console.error("Error deleting patient:", error);
        toast.error("An error occurred while deleting patient. Please try again later.");
      }
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader>Delete Patient</ModalHeader>
        <div className="p-4">
          <p>Enter the email of the patient you want to delete:</p>
          <input
            type="email"
            className="w-full border-gray-300 rounded-md p-2 mt-2"
            placeholder="Enter patient's email"
            value={email}
            onChange={handleEmailChange}
          />
          {patient && (
            <div className="mt-4">
              <p>Patient Details:</p>
              <p>Name: {patient.name}</p>
              <p>Email: {patient.email}</p>
            </div>
          )}
        </div>
        <ModalFooter>
          {fetchButtonVisible && (
            <Button color="primary" onClick={handleFetchPatient}>Fetch Patient</Button>
          )}
          {patient && (
            <>
              <Button color="success" onClick={handleDeletePatient}>Delete</Button>
              <Button  color="danger"  onClick={onClose}>Cancel</Button>
            </>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeletePatientModal;
