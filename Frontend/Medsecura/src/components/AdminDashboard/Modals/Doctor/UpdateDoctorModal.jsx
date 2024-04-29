import React, { useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Input, Button } from "@nextui-org/react";
import axios from "axios";
import { toast } from "react-toastify";

const UpdateDoctorModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [doctor, setDoctor] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    specialty: '',
    contactNumber: '',
    address: '',
    qualification: ''
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

      const dataToSend = {
        ...formData,
        email: doctor.email 
      };
      const response = await axios.put("http://localhost:3000/auth/update-doctor", dataToSend);
      console.log(response.data);
      toast.success("Doctor details updated successfully!");
    } catch (error) {
      console.error("Error updating doctor:", error);
      toast.error("An error occurred while updating doctor details. Please try again later.");
    }
  };
  

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleFetchDoctor = async () => {
    try {
      const response = await axios.post("http://localhost:3000/auth/get-doctor", { email });
      setDoctor(response.data.doctor);
      // Set the form data with fetched doctor details
      setFormData({
        name: response.data.doctor.name,
        specialty: response.data.doctor.specialty,
        contactNumber: response.data.doctor.contactNumber,
        address: response.data.doctor.address,
        qualification: response.data.doctor.qualification
      });
    } catch (error) {
      console.error("Error fetching doctor:", error);
      toast.error("An error occurred while fetching doctor details. Please try again later.");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="5xl">
      <ModalContent>
        <ModalHeader>Update Doctor Details</ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col space-y-4">
              <div className="flex flex-row space-x-4 items-center">
                <Input
                  label="Email"
                  placeholder="Enter doctor's email"
                  value={email}
                  onChange={handleEmailChange}
                />
                <Button color="secondary" auto onClick={handleFetchDoctor}>Fetch Doctor</Button>
              </div>
              {doctor && (
                <>
                  <Input
                    label="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                  <Input
                    label="Specialty"
                    name="specialty"
                    value={formData.specialty}
                    onChange={handleInputChange}
                  />
                  <Input
                    label="Contact Number"
                    name="contactNumber"
                    value={formData.contactNumber}
                    onChange={handleInputChange}
                  />
                  <Input
                    label="Address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                  />
                  <Input
                    label="Qualification"
                    name="qualification"
                    value={formData.qualification}
                    onChange={handleInputChange}
                  />
                </>
              )}
            </div>
            {doctor && (
              <Button className="mt-6" color="success" type="submit">Update Doctor</Button>
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

export default UpdateDoctorModal;
