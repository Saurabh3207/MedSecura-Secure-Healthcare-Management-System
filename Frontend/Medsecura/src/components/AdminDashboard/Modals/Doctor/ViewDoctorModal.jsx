import React, { useState, useEffect } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Input, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button } from "@nextui-org/react";
import axios from "axios";

const ViewDoctorModal = ({ isOpen, onClose, size }) => {
  const [doctors, setDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (isOpen) {
      // Fetch doctor data from the backend API
      const fetchDoctors = async () => {
        try {
          const response = await axios.get("http://localhost:3000/auth/get-doctors");
          setDoctors(response.data.doctors); 
        } catch (error) {
          console.error("Error fetching doctors:", error);
        }
      };
      fetchDoctors();
    }
  }, [isOpen]); 

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={size}>
      <ModalContent>
        <ModalHeader>View Doctors</ModalHeader>
        <ModalBody>
          <Input
            label="Search"
            placeholder="Search doctors"
            value={searchTerm}
            onChange={handleSearch}
          />
          <Table aria-label="Doctor table">
            <TableHeader>
              <TableColumn>Name</TableColumn>
              <TableColumn>Email</TableColumn>
              <TableColumn>Specialty</TableColumn>
              <TableColumn>Contact Number</TableColumn>
              <TableColumn>Address</TableColumn>
              <TableColumn>Qualification</TableColumn>
            </TableHeader>
            <TableBody emptyContent="No doctors found.">
              {doctors
                .filter((doctor) =>
                  doctor.name.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((doctor) => (
                  <TableRow key={doctor.id}>
                    <TableCell>{doctor.name}</TableCell>
                    <TableCell>{doctor.email}</TableCell>
                    <TableCell>{doctor.specialty}</TableCell>
                    <TableCell>{doctor.contactNumber}</TableCell>
                    <TableCell>{doctor.address}</TableCell>
                    <TableCell>{doctor.qualification}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
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

export default ViewDoctorModal;
