import React, { useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input } from "@nextui-org/react";
import axios from "axios";
import { toast } from "react-toastify";

const AddDoctorModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    specialty: "",
    contactNumber: "",
    address: "",
    qualification: "",
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.specialty.trim()) {
      newErrors.specialty = "Specialty is required";
    }
    if (formData.contactNumber.trim() && !/^\d{10}$/.test(formData.contactNumber)) {
      newErrors.contactNumber = "Contact number is invalid";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
        console.log("Form Data:", formData);
      try {
        const response = await axios.post("http://localhost:3000/auth/add-doctor", formData);
        console.log("Response:", response.data);
        toast.success("Doctor added successfully!");
        onClose();
      } catch (error) {
        console.error("Error:", error);
        toast.error("An error occurred while adding the doctor. Please try again later.");
      }
    } else {
      toast.error("Please fill in all required fields correctly.");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleClear = (fieldName) => {
    setFormData({ ...formData, [fieldName]: "" });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="5xl">
      <ModalContent>
        <ModalHeader>Add New Doctor</ModalHeader>
        <ModalBody>
          <div className="flex flex-col space-y-4">
            <Input
              isRequired
              label="Name"
              placeholder="Enter doctor's name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              errorMessage={errors.name}
              variant={errors.name ? "bordered" : "default"}
              onClear={() => handleClear("name")}
            />
            <Input
              isRequired
              label="Email"
              type="email"
              placeholder="Enter doctor's email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              errorMessage={errors.email}
              variant={errors.email ? "bordered" : "default"}
              onClear={() => handleClear("email")}
            />
            <Input
              isRequired
              label="Specialty"
              placeholder="Enter doctor's specialty"
              name="specialty"
              value={formData.specialty}
              onChange={handleChange}
              errorMessage={errors.specialty}
              variant={errors.specialty ? "bordered" : "default"}
              onClear={() => handleClear("specialty")}
            />
            <Input
              label="Contact Number"
              placeholder="Enter doctor's contact number"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              errorMessage={errors.contactNumber}
              variant={errors.contactNumber ? "bordered" : "default"}
              onClear={() => handleClear("contactNumber")}
            />
            <Input
              label="Address"
              placeholder="Enter doctor's address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              errorMessage={errors.address}
              variant={errors.address ? "bordered" : "default"}
              onClear={() => handleClear("address")}
            />
            <Input
              label="Qualification"
              placeholder="Enter doctor's qualification"
              name="qualification"
              value={formData.qualification}
              onChange={handleChange}
              errorMessage={errors.qualification}
              variant={errors.qualification ? "bordered" : "default"}
              onClear={() => handleClear("qualification")}
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="default" auto onClick={onClose}>
            Cancel
          </Button>
          <Button color="primary" auto onClick={handleSubmit}>
            Add Doctor
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddDoctorModal;
