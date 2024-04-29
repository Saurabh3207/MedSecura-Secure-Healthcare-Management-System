import React, { useState, useEffect } from "react";
import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Input,
	Table,
	TableHeader,
	TableColumn,
	TableBody,
	TableRow,
	TableCell,
	Button,
} from "@nextui-org/react";
import axios from "axios";

const ViewappointmentModal = ({ isOpen, onClose, size }) => {
	const [appointments, setappointments] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");

	useEffect(() => {
		if (isOpen) {
			// Fetch appointment data from the backend API
			const fetchappointments = async () => {
				try {
					const response = await axios.get("http://localhost:3000/auth/get-appointments");
					setappointments(response.data.appointments);
				} catch (error) {
					console.error("Error fetching appointments:", error);
				}
			};
			fetchappointments();
		}
	}, [isOpen]);

	const handleSearch = (e) => {
		setSearchTerm(e.target.value);
	};

	return (
		<Modal isOpen={isOpen} onClose={onClose} size={size}>
			<ModalContent>
				<ModalHeader>View appointments</ModalHeader>
				<ModalBody>
					<Input
						label="Search"
						placeholder="Search appointments"
						value={searchTerm}
						onChange={handleSearch}
					/>
					<Table aria-label="appointment table">
						<TableHeader>
							<TableColumn>ID</TableColumn>
							<TableColumn>Patient</TableColumn>
							<TableColumn>Doctor</TableColumn>
							<TableColumn>Appointment Date</TableColumn>
						</TableHeader>
						<TableBody emptyContent="No appointments found.">
							{appointments
								.filter((appointment) =>
									appointment.name
										.toLowerCase()
										.includes(searchTerm.toLowerCase())
								)
								.map((appointment) => (
									<TableRow key={appointment.id}>
										<TableCell>{appointment.patient}</TableCell>
										<TableCell>{appointment.doctor}</TableCell>
										<TableCell>{appointment.appointment_date}</TableCell>
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

export default ViewappointmentModal;
