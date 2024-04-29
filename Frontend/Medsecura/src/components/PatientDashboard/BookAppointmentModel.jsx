import React, { useState } from "react";
import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
	Input,
} from "@nextui-org/react";
import axios from "axios";
import { toast } from "react-toastify";

const BookAppointmentModel = ({ isOpen, onClose }) => {
	const [formData, setFormData] = useState({
		patient: "",
		doctor: "",
		appointment_date: "",
	});

	const [errors, setErrors] = useState({
		patient: "",
		doctor: "",
		appointment_date: "",
	});

	const validateForm = () => {
		const newErrors = {};
		if (!formData.patient) {
			newErrors.patient = "Patient is required";
		}
		if (!formData.doctor) {
			newErrors.doctor = "Doctor is required";
		}
		if (!formData.appointment_date) {
			newErrors.appointment_date = "Appointment date is required";
		}
		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = async () => {
		if (validateForm()) {
			console.log("Form Data:", formData);
			// lets make date into a string
			formData.appointment_date = "hello";
			try {
				const response = await axios.post(
					"http://localhost:3000/auth/add-appointment",
					formData
				);
				console.log("Response:", response.data);
				toast.success("Appointment added successfully!");
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
		console.log(formData);
		console.log(e.target.name, e.target.value);
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleClear = (fieldName) => {
		setFormData({ ...formData, [fieldName]: "" });
	};

	return (
		<Modal isOpen={isOpen} onClose={onClose} size="5xl">
			<ModalContent>
				<ModalHeader>Add New Appointment</ModalHeader>
				<ModalBody>
					<div className="flex flex-col space-y-4">
						<Input
							isRequired
							label="Enter Patient's Name"
							placeholder="Enter Patient's Name"
							name="patient"
							value={formData.patient}
							onChange={handleChange}
							errorMessage={errors.name}
							variant={errors.name ? "bordered" : "default"}
							onClear={() => handleClear("patient_name")}
						/>
						<Input
							isRequired
							label="Enter Doctor's Name"
							placeholder="Enter Doctor's Name"
							name="doctor"
							value={formData.doctor}
							onChange={handleChange}
							errorMessage={errors.name}
							variant={errors.name ? "bordered" : "default"}
							onClear={() => handleClear("doctor_name")}
						/>
						<Input
							isRequired
							label="Appointment Date"
							type="date"
							name="appointment_date"
							value={formData.appointment_date}
							onChange={handleChange}
							errorMessage={errors.appointment_date}
							variant={errors.appointment_date ? "bordered" : "default"}
							onClear={() => handleClear("appointment_date")}
						/>
					</div>
				</ModalBody>
				<ModalFooter>
					<Button color="default" auto onClick={onClose}>
						Cancel
					</Button>
					<Button color="primary" auto onClick={handleSubmit}>
						Add Appointment
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};

export default BookAppointmentModel;
