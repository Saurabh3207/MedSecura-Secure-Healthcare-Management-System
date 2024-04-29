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

const AddPatientModal = ({ isOpen, onClose, size }) => {
	const [formData, setFormData] = useState({
		name: "",
		middleName: "",
		lastName: "",
		dob: "",
		gender: "",
		email: "",
		abhaId: "",
		contactNumber: "",
		homeAddress: "",
		bloodGroup: "",
		martialStatus: "",
		occupation: "",
		religion: "",
		age: "",
	});

	const [errors, setErrors] = useState({});

	const validateForm = () => {
		const newErrors = {};
		if (!formData.name.trim()) {
			newErrors.name = "Name is required";
		}
		if (!formData.middleName.trim()) {
			newErrors.middleName = "Middle Name is required";
		}
		if (!formData.lastName.trim()) {
			newErrors.lastName = "Last Name is required";
		}
		if (!formData.dob.trim()) {
			newErrors.dob = "Date of Birth is required";
		}
		if (!formData.gender.trim()) {
			newErrors.gender = "Gender is required";
		}
		if (!formData.email.trim()) {
			newErrors.email = "Email is required";
		} else if (!/\S+@\S+\.\S+/.test(formData.email)) {
			newErrors.email = "Email is invalid";
		}
		if (!formData.abhaId.trim()) {
			newErrors.abhaId = "ABHA ID is required";
		} else if (formData.abhaId.trim().length !== 14) {
			newErrors.abhaId = "ABHA ID must be 14 characters";
		}
		if (!formData.occupation.trim()) {
			newErrors.occupation = "Occupation is required";
		}
		if (!formData.age.trim()) {
			newErrors.age = "Age is required";
		}
		if (!formData.contactNumber.trim()) {
			newErrors.contactNumber = "Contact number is required";
		}
		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = async () => {
		if (validateForm()) {
			try {
				const response = await axios.post("http://localhost:3000/auth/add-patient", {
					name: formData.name,
					middleName: formData.middleName,
					lastName: formData.lastName,
					dateOfBirth: formData.dob,
					gender: formData.gender,
					email: formData.email,
					ABHAID: formData.abhaId,
					contactNumber: formData.contactNumber,
					homeAddress: formData.homeAddress,
					bloodGroup: formData.bloodGroup,
					martialStatus: formData.martialStatus,
					occupation: formData.occupation,
					Religion: formData.religion,
					age: formData.age,
				});
				console.log("Response:", response.data);
				toast.success("Patient added successfully!");
				onClose();
			} catch (error) {
				console.error("Error:", error);
				toast.error("An error occurred while adding the patient. Please try again later.");
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
		<Modal isOpen={isOpen} onClose={onClose} size={size}>
			<ModalContent>
				<ModalHeader>Add New Patient</ModalHeader>
				<ModalBody>
					<div className="flex flex-col space-y-4">
						<div className="flex flex-row space-x-4">
							<Input
								isRequired
								isClearable
								label="Name"
								placeholder="Enter patient's name"
								name="name"
								value={formData.name}
								onChange={handleChange}
								errorMessage={errors.name}
								variant={errors.name ? "bordered" : "default"}
								onClear={() => handleClear("name")}
							/>
							<Input
								isRequired
								isClearable
								label="Middle Name"
								placeholder="Enter patient's middle name"
								name="middleName"
								value={formData.middleName}
								onChange={handleChange}
								errorMessage={errors.middleName}
								variant={errors.middleName ? "bordered" : "default"}
								onClear={() => handleClear("middleName")}
							/>
							<Input
								isRequired
								isClearable
								label="Last Name"
								placeholder="Enter patient's last name"
								name="lastName"
								value={formData.lastName}
								onChange={handleChange}
								errorMessage={errors.lastName}
								variant={errors.lastName ? "bordered" : "default"}
								onClear={() => handleClear("lastName")}
							/>
						</div>
						<div className="flex flex-row space-x-4">
							<Input
								isRequired
								label="Date of Birth"
								type="date"
								name="dob"
								value={formData.dob}
								onChange={handleChange}
								errorMessage={errors.dob}
								variant={errors.dob ? "bordered" : "default"}
								onClear={() => handleClear("dob")}
							/>
							<Input
								isRequired
								isClearable
								label="Gender"
								placeholder="Enter patient's gender"
								name="gender"
								value={formData.gender}
								onChange={handleChange}
								errorMessage={errors.gender}
								variant={errors.gender ? "bordered" : "default"}
								onClear={() => handleClear("gender")}
							/>
							<Input
								isClearable
								isRequired
								label="Email"
								type="email"
								placeholder="Enter patient's email"
								name="email"
								value={formData.email}
								onChange={handleChange}
								errorMessage={errors.email}
								variant={errors.email ? "bordered" : "default"}
								endContent={
									<div className="pointer-events-none flex items-center">
										<span className="text-default-700 text-small">
											@gmail.com/
										</span>
									</div>
								}
								onClear={() => handleClear("email")}
							/>
						</div>
						<div className="flex flex-row space-x-4">
							<Input
								isClearable
								isRequired
								label="ABHA ID"
								placeholder="Enter ABHA ID"
								maxLength={14}
								name="abhaId"
								value={formData.abhaId}
								onChange={handleChange}
								errorMessage={errors.abhaId}
								variant={errors.abhaId ? "bordered" : "default"}
								onClear={() => handleClear("abhaId")}
							/>
							<Input
								isClearable
								label="Contact Number"
								placeholder="Enter patient's contact number"
								name="contactNumber"
								value={formData.contactNumber}
								onChange={handleChange}
								errorMessage={errors.contactNumber}
								variant={errors.contactNumber ? "bordered" : "default"}
								onClear={() => handleClear("contactNumber")}
							/>
						</div>
						<div className="flex flex-row space-x-4">
							<Input
								label="Home Address"
								placeholder="Enter patient's home address"
								name="homeAddress"
								value={formData.homeAddress}
								onChange={handleChange}
								errorMessage={errors.homeAddress}
								variant={errors.homeAddress ? "bordered" : "default"}
								onClear={() => handleClear("homeAddress")}
							/>
							<Input
								label="Blood Group"
								placeholder="Enter patient's blood group"
								name="bloodGroup"
								value={formData.bloodGroup}
								onChange={handleChange}
								errorMessage={errors.bloodGroup}
								variant={errors.bloodGroup ? "bordered" : "default"}
								onClear={() => handleClear("bloodGroup")}
							/>
							<Input
								label="martial Status"
								placeholder="Enter patient's martial status"
								name="martialStatus"
								value={formData.martialStatus}
								onChange={handleChange}
								errorMessage={errors.martialStatus}
								variant={errors.martialStatus ? "bordered" : "default"}
								onClear={() => handleClear("martialStatus")}
							/>
						</div>
						<div className="flex flex-row space-x-4">
							<Input
								isRequired
								label="Occupation"
								placeholder="Enter patient's occupation"
								name="occupation"
								value={formData.occupation}
								onChange={handleChange}
								errorMessage={errors.occupation}
								variant={errors.occupation ? "bordered" : "default"}
								onClear={() => handleClear("occupation")}
							/>
							<Input
								label="Religion"
								placeholder="Enter patient's religion"
								name="religion"
								value={formData.religion}
								onChange={handleChange}
								errorMessage={errors.religion}
								variant={errors.religion ? "bordered" : "default"}
								onClear={() => handleClear("religion")}
							/>
							<Input
								label="Age"
								type="number"
								placeholder="Enter patient's age"
								name="age"
								value={formData.age}
								onChange={handleChange}
								errorMessage={errors.age}
								variant={errors.age ? "bordered" : "default"}
								onClear={() => handleClear("age")}
							/>
						</div>
					</div>
				</ModalBody>
				<ModalFooter>
					<Button color="default" auto onClick={onClose}>
						Cancel
					</Button>
					<Button color="primary" auto onClick={handleSubmit}>
						Add Patient
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};

export default AddPatientModal;
