import React, { useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Input, Button } from "@nextui-org/react";
import axios from "axios";
import { toast } from "react-toastify";

const UpdatePatientModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [patient, setPatient] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    middleName: '',
    lastName: '',
    dateOfBirth: '',
    gender: '',
    abhaId: '',
    homeAddress: '',
    bloodGroup: '',
    maritalStatus: '',
    occupation: '',
 
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedFormData = { ...formData, email }; 
      const response = await axios.put("http://localhost:3000/auth/update-patient", updatedFormData);
      console.log(response.data);
      toast.success("Patient details updated successfully!");
    } catch (error) {
      console.error("Error updating patient:", error);
      toast.error("An error occurred while updating patient details. Please try again later.");
    }
  };
  

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleFetchPatient = async () => {
    try {
      const response = await axios.post("http://localhost:3000/auth/get-patient", { email });
      setPatient(response.data.patient);
      // Set the form data with fetched patient details
      setFormData({
        name: response.data.patient.name,
        middleName: response.data.patient.middleName,
        lastName: response.data.patient.lastName,
        dateOfBirth: response.data.patient.dateOfBirth,
        gender: response.data.patient.gender,
        abhaId: response.data.patient.ABHAID,
        homeAddress: response.data.patient.homeAddress,
        bloodGroup: response.data.patient.bloodGroup,
        maritalStatus: response.data.patient.martialStatus,
        occupation: response.data.patient.occupation,
      
      });
    } catch (error) {
      console.error("Error fetching patient:", error);
      toast.error("An error occurred while fetching patient details. Please try again later.");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="5xl">
      <ModalContent>
        <ModalHeader>Update Patient Details</ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col space-y-4">
              <div className="flex flex-row space-x-4 items-center">
                <Input
                  label="Email"
                  placeholder="Enter patient's email"
                  value={email}
                  onChange={handleEmailChange}
                />
                <Button color="secondary" auto onClick={handleFetchPatient}>Fetch Patient</Button>
              </div>
              {patient && (
                <>
                  <div className="flex flex-row space-x-4">
                    <Input
                      label="Name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                    <Input
                      label="Middle Name"
                      name="middleName"
                      value={formData.middleName}
                      onChange={handleInputChange}
                    />
                    <Input
                      label="Last Name"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="flex flex-row space-x-4">
                    <Input
                      label="Date of Birth"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleInputChange}
                    />
                    <Input
                      label="Gender"
                      name="gender"
                      value={formData.gender}
                      onChange={handleInputChange}
                    />
                    <Input
                      label="ABHA ID"
                      name="abhaId"
                      value={formData.abhaId}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="flex flex-row space-x-4">
                    <Input
                      label="Home Address"
                      name="homeAddress"
                      value={formData.homeAddress}
                      onChange={handleInputChange}
                    />
                    <Input
                      label="Blood Group"
                      name="bloodGroup"
                      value={formData.bloodGroup}
                      onChange={handleInputChange}
                    />
                    <Input
                      label="Marital Status"
                      name="maritalStatus"
                      value={formData.maritalStatus}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="flex flex-row space-x-4">
                    <Input
                      label="Occupation"
                      name="occupation"
                      value={formData.occupation}
                      onChange={handleInputChange}
                    />
                  </div>
                </>
              )}
            </div>
            {patient && (
              <Button className = "mt-6" color="success" type="submit">Update Patient</Button>
            )}
          </form>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" auto onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UpdatePatientModal;

