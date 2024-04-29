import React, { useState } from "react";
import { Navbar, NavbarBrand, NavbarContent } from "@nextui-org/react";
import { LogoImage } from "../AdminDashboard/logo";
import { IconLogout } from "@tabler/icons-react";
import AppointmentIcon from "../Assets/ICONS/appointment.png";
import ViewDoctorModal from "../AdminDashboard/Modals/Doctor/ViewDoctorModal";
import ViewDoctor from "../Assets/ICONS/doctor.png";
import BookAppointmentModel from "./BookAppointmentModel";
import ViewappointmentModal from "../DoctorDashboard/ViewAppointmentModel";
const PatientDashboard = () => {
	const handleLogout = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("role");
		window.location.href = "/login";
	};

	const [isViewDoctorModalOpen, setViewDoctorModalOpen] = useState(false);
	const [isViewAppointmentModalOpen, setViewAppointmentModalOpen] = useState(false);
	const [isBookAppointmentModalOpen, setBookAppointmentModalOpen] = useState(false);

	const handleViewDoctorClick = () => {
		setViewDoctorModalOpen(true);
	};

	const handleViewDoctorModalClose = () => {
		setViewDoctorModalOpen(false);
	};

	return (
		<div>
			<Navbar
				isBordered
				style={{
					width: "80%",
					margin: "0 auto",
					borderRadius: "20px",
					boxShadow: "0px 4px 10px rgba(128, 0, 128, 0.5)",
				}}
			>
				<NavbarContent justify="start">
					<NavbarBrand className="mr-4">
						<LogoImage />
						<p className="hidden sm:block font-bold text-inherit">Medsecura</p>
					</NavbarBrand>
				</NavbarContent>

				<NavbarContent as="div" className="items-center" justify="end">
					<IconLogout
						onClick={handleLogout}
						style={{
							cursor: "pointer",
							color: "#00c7d7",
						}}
					/>
				</NavbarContent>
			</Navbar>
			{/* Main Content */}
			<div
				style={{
					marginTop: "20px",
					boxShadow: "0px 4px 10px rgba(128, 0, 128, 0.5)",
					padding: "20px",
				}}
			>
				<h1
					className="text-2xl font-bold text-center "
					style={{
						backgroundColor: "#DFFF00",
						width: "80%",
						margin: "0 auto",
						borderRadius: "20px",
					}}
				>
					Welcome, Patient !{" "}
				</h1>
				<hr
					style={{
						borderTop: "1px solid rgba(128, 0, 128, 0.5)",
						margin: "20px auto",
					}}
				/>

				<div
					style={{
						borderTop: "1px solid rgba(128, 0, 128, 0.5)",
						margin: "20px auto 0",
					}}
				></div>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4"></div>

				{/* Icon section */}
				<div className="flex items-center gap-10 mt-4">
					<button
						className="text-center flex flex-col items-center"
						onClick={() => {
							setViewAppointmentModalOpen(true);
						}}
					>
						<img
							src={AppointmentIcon}
							alt="View Appointments"
							style={{ width: "70px", height: "70px", marginBottom: "8px" }}
						/>
						<h1 className="text-lg font-semibold" style={{ margin: "0" }}>
							View Appointment
						</h1>
					</button>
					<button
						className="text-center flex flex-col items-center"
						onClick={() => {
							setBookAppointmentModalOpen(true);
						}}
					>
						<img
							src={AppointmentIcon}
							alt="View Appointments"
							style={{ width: "70px", height: "70px", marginBottom: "8px" }}
						/>
						<h1 className="text-lg font-semibold" style={{ margin: "0" }}>
							Book Appointment
						</h1>
					</button>
					<button
						className="text-center flex flex-col items-center"
						onClick={handleViewDoctorClick}
					>
						<img
							src={ViewDoctor}
							alt="View Doctors"
							style={{ width: "70px", height: "70px", marginBottom: "8px" }}
						/>
						<h1 className="text-lg font-semibold" style={{ margin: "0" }}>
							View Doctors
						</h1>
					</button>
				</div>

				<ViewDoctorModal
					isOpen={isViewDoctorModalOpen}
					onClose={handleViewDoctorModalClose}
					size="5xl"
				/>

				<BookAppointmentModel
					isOpen={isBookAppointmentModalOpen}
					onClose={() => {
						setBookAppointmentModalOpen(false);
					}}
					size="5xl"
				/>

				<ViewappointmentModal
					isOpen={isViewAppointmentModalOpen}
					onClose={() => {
						setViewAppointmentModalOpen(false);
					}}
					size="5xl"
				/>
			</div>
		</div>
	);
};

export default PatientDashboard;
