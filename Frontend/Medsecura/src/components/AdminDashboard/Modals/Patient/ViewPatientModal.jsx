import React, { useState, useEffect } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Input, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button } from "@nextui-org/react";
import axios from "axios";

const ViewPatientModal = ({ isOpen, onClose, size }) => {
  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (isOpen) {
      // Fetch patient data from the backend API
      const fetchPatients = async () => {
        try {
          const response = await axios.get("http://localhost:3000/auth/get-patients");
          setPatients(response.data.patients); 
        } catch (error) {
          console.error("Error fetching patients:", error);
        }
      };
      fetchPatients();
    }
  }, [isOpen]); 

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={size}>
      <ModalContent>
        <ModalHeader>View Patients</ModalHeader>
        <ModalBody>
          <Input
            label="Search"
            placeholder="Search patients"
            value={searchTerm}
            onChange={handleSearch}
          />
          <Table aria-label="Patient table">
            <TableHeader>
              <TableColumn>Name</TableColumn>
              <TableColumn>Middle Name</TableColumn>
              <TableColumn>Last Name</TableColumn>
              <TableColumn>Email</TableColumn>
              <TableColumn>Contact Number</TableColumn>
              <TableColumn>DOB</TableColumn>
              <TableColumn>Gender</TableColumn>
              <TableColumn>Abha ID</TableColumn>
              <TableColumn>Home Address</TableColumn>
              <TableColumn>Blood Group</TableColumn>
              <TableColumn>Marital Status</TableColumn>
              <TableColumn>Occupation</TableColumn>
              <TableColumn>Religion</TableColumn>
              <TableColumn>Age</TableColumn>
            </TableHeader>
            <TableBody emptyContent="No patients found.">
              {patients
                .filter((patient) =>
                  patient.name.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((patient) => (
                  <TableRow key={patient.id}>
                    <TableCell>{patient.name}</TableCell>
                    <TableCell>{patient.middleName}</TableCell>
                    <TableCell>{patient.lastName}</TableCell>
                    <TableCell>{patient.email}</TableCell>
                    <TableCell>{patient.contactNumber}</TableCell>
                    <TableCell>{patient.dateOfBirth}</TableCell>
                    <TableCell>{patient.gender}</TableCell>
                    <TableCell>{patient.ABHAID}</TableCell>
                    <TableCell>{patient.homeAddress}</TableCell>
                    <TableCell>{patient.bloodGroup}</TableCell>
                    <TableCell>{patient.martialStatus}</TableCell>
                    <TableCell>{patient.occupation}</TableCell>
                    <TableCell>{patient.religion}</TableCell>
                    <TableCell>{patient.age}</TableCell>
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

export default ViewPatientModal;
