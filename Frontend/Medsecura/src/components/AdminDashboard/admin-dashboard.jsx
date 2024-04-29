// src/components/Navbar.js
import React, { useState } from "react";
import { Navbar, NavbarBrand, NavbarContent } from "@nextui-org/react";
import { LogoImage } from "./logo.jsx";
import { IconLogout } from "@tabler/icons-react";
import {IconUserCircle} from "@tabler/icons-react";
import ViewPatient from "../Assets/ICONS/patient.png";
import AddPatient from "../Assets/ICONS/AddPatient.png";
import UpdatePatient from "../Assets/ICONS/updatpatient.png";
/*import AlertIcon from "../Assets/ICONS/fire alert.png";*/
/*import FeedbackIcon from "../Assets/ICONS/feedback.png"; */
import AddDoctorIcon from "../Assets/ICONS/AddDoctor.jpg";
import ViewDoctorIcon from "../Assets/ICONS/doctor.png";
import UpdateDoctorIcon from "../Assets/ICONS//updatedoctor.png";
import AdminUpdateProfile from "../Assets/ICONS/updateprofile.jpg";
import DeletePatientIcon from "../Assets/ICONS/remove patient.png";
import DeleteDoctorIcon from "../Assets/ICONS/remove-doctor.jpg";
import AddPatientModal from "./Modals/Patient/AddPatientModal.jsx";
import AddDoctorModal from "./Modals/Doctor/AddDoctorModal.jsx";
import ViewPatientModal from "./Modals/Patient/ViewPatientModal.jsx";
import ViewDoctorModal from "./Modals/Doctor/ViewDoctorModal.jsx";
import UpdatePatientModal from "./Modals/Patient/UpdatePatientModal.jsx";
import UpdateDoctorModal from "./Modals/Doctor/UpdateDoctorModal.jsx";
import DeletePatientModal from "./Modals/Patient/DeletePatientModal.jsx";
import DeleteDoctorModal from "./Modals/Doctor/DeleteDoctorModal.jsx";
const AdminDashboard = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location.href = "/login";
  };
  const [isDeleteDoctorModalOpen, setDeleteDoctorModalOpen] = useState(false);
  const handleDeleteDoctorClick = () => {
    setDeleteDoctorModalOpen(true);
  };
  const handleDeleteDoctorModalClose = () => {
    setDeleteDoctorModalOpen(false);
  };

  const [isDelePatientModalOpen, setDeletePatientModalOpen] = useState(false);
  const handleDeletePatientClick = () => {
    setDeletePatientModalOpen(true);
  };
  const handleDeletePatientModalClose = () => {
    setDeletePatientModalOpen(false);
  };

  const [isUpdateDoctorModalOpen, setUpdateDoctorModalOpen] = useState(false);
  const handleUpdateDoctorClick = () => {
    setUpdateDoctorModalOpen(true);
  };
  const handleUpdateDoctorModalClose = () => {
    setUpdateDoctorModalOpen(false);
  };

  const [isUpdatePatientModalOpen, setUpdatePatientModalOpen] = useState(false);
  const handleUpdatePatientClick = () => {
    setUpdatePatientModalOpen(true);
  };
  const handleUpdatePatientModalClose = () => {
    setUpdatePatientModalOpen(false);
  };

  const [isViewDoctorModalOpen, setViewDoctorModalOpen] = useState(false);
  const handleViewDoctorClick = () => {
    setViewDoctorModalOpen(true);
  };
  const handleViewDoctorModalClose = () => {
    setViewDoctorModalOpen(false);
  };

  const [isViewPatientModalOpen, setViewPatientModalOpen] = useState(false);

  const handleViewPatientClick = () => {
    setViewPatientModalOpen(true);
  };

  const handleViewPatientModalClose = () => {
    setViewPatientModalOpen(false);
  };

  const [isAddDoctorModalOpen, setAddDoctorModalOpen] = useState(false); // State to manage modal visibility

  const handleAddDoctorClick = () => {
    setAddDoctorModalOpen(true);
  };

  const handleAddDoctorModalClose = () => {
    setAddDoctorModalOpen(false);
  };

  const [isAddPatientModalOpen, setAddPatientModalOpen] = useState(false);

  const handleAddPatientClick = () => {
    setAddPatientModalOpen(true);
  };

  const handleAddPatientModalClose = () => {
    setAddPatientModalOpen(false);
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
          Welcome, Admin!{" "}
        </h1>
        <hr
          style={{
            borderTop: "1px solid rgba(128, 0, 128, 0.5)",
            margin: "20px auto",
          }}
        />
        <div className="flex items-center gap-10 mt-4">
          {/*
          <button
            className="text-center flex flex-col items-center"
            onClick={() => handleIconClick("UpdatePatients")}
          >
            <img
              src={AlertIcon}
              alt="Alert"
              style={{ width: "70px", height: "70px", marginBottom: "8px" }}
            />
            <h1 className="text-lg font-semibold" style={{ margin: "0" }}>
              Fire Alert
            </h1>
          </button>
        */}
       {/*
        <button
            className="text-center flex flex-col items-center"
            onClick={() => handleIconClick("UpdatePatients")}
          >
            <img
              src={IconUserCircle}
              alt="View Profile"
              style={{ width: "70px", height: "70px", marginBottom: "8px" }}
            />
            <h1 className="text-lg font-semibold" style={{ margin: "0" }}>
              View Profile
            </h1>
          </button>
          <button
            className="text-center flex flex-col items-center"
            onClick={() => handleIconClick("UpdatePatients")}
          >
            <img
              src={AdminUpdateProfile}
              alt="Update Profile"
              style={{ width: "70px", height: "70px", marginBottom: "8px" }}
            />
            <h1 className="text-lg font-semibold" style={{ margin: "0" }}>
              Update Profile
            </h1>
          </button>
          */}

        </div>
        <h1 className="text-2xl font-bold mt-8">Patient Section...!</h1>
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
            onClick={handleViewPatientClick}
          >
            <img
              src={ViewPatient}
              alt="View Patients"
              style={{ width: "70px", height: "70px", marginBottom: "8px" }}
            />
            <h1 className="text-lg font-semibold" style={{ margin: "0" }}>
              View Patients
            </h1>
          </button>
          <button
            className="text-center flex flex-col items-center"
            onClick={handleAddPatientClick}
          >
            <img
              src={AddPatient}
              alt="Add Patients"
              style={{ width: "70px", height: "70px", marginBottom: "8px" }}
            />
            <h1 className="text-lg font-semibold" style={{ margin: "0" }}>
              Add Patients
            </h1>
          </button>

          <button
            className="text-center flex flex-col items-center"
            onClick={handleUpdatePatientClick}
          >
            <img
              src={UpdatePatient}
              alt="Update Patients"
              style={{ width: "70px", height: "70px", marginBottom: "8px" }}
            />
            <h1 className="text-lg font-semibold" style={{ margin: "0" }}>
              Update Patients
            </h1>
          </button>
          {/*
          <button
            className="text-center flex flex-col items-center"
            onClick={() => handleIconClick("UpdatePatients")}
          >
            <img
              src={FeedbackIcon}
              alt="Patients Feedback"
              style={{ width: "70px", height: "70px", marginBottom: "8px" }}
            />
            <h1 className="text-lg font-semibold" style={{ margin: "0" }}>
              Feedbacks
            </h1>
          </button>
          */}
          <button
            className="text-center flex flex-col items-center"
            onClick={handleDeletePatientClick}
        > 
      

            <img
              src={DeletePatientIcon}
              alt="Remove Patients"
              style={{ width: "70px", height: "70px", marginBottom: "8px" }}
            />
            <h1 className="text-lg font-semibold" style={{ margin: "0" }}>
              Delete Patient
            </h1>
          </button>
        </div>

        {/* Horizontal line above Doctor section */}
        <hr
          style={{
            borderTop: "1px solid rgba(128, 0, 128, 0.5)",
            margin: "20px auto",
          }}
        />

        {/* Doctor Section heading */}
        <h1 className="text-2xl font-bold mt-4">Doctors Sections...!</h1>

        {/* Horizontal line below Doctor section */}
        <hr
          style={{
            borderTop: "1px solid rgba(128, 0, 128, 0.5)",
            margin: "20px auto",
          }}
        />
        <div className="flex items-center gap-10 mt-4">
          <button
            className="text-center flex flex-col items-center"
            onClick={handleViewDoctorClick}
          >
            <img
              src={ViewDoctorIcon}
              alt="View Doctors"
              style={{ width: "70px", height: "70px", marginBottom: "8px" }}
            />
            <h1 className="text-lg font-semibold" style={{ margin: "0" }}>
              View Doctors
            </h1>
          </button>
          <button
            className="text-center flex flex-col items-center"
            onClick={handleAddDoctorClick}
          >
            <img
              src={AddDoctorIcon}
              alt="Add Doctors"
              style={{ width: "70px", height: "70px", marginBottom: "8px" }}
            />
            <h1 className="text-lg font-semibold" style={{ margin: "0" }}>
              Add Doctors
            </h1>
          </button>

          <button
            className="text-center flex flex-col items-center"
            onClick={handleUpdateDoctorClick}
          >
            <img
              src={UpdateDoctorIcon}
              alt="Update Doctors"
              style={{ width: "70px", height: "70px", marginBottom: "8px" }}
            />
            <h1 className="text-lg font-semibold" style={{ margin: "0" }}>
              Update Doctors
            </h1>
          </button>
          
          <button
            className="text-center flex flex-col items-center"
            onClick={handleDeleteDoctorClick}
          >
            <img
              src={DeleteDoctorIcon}
              alt="Delete Doctors"
              style={{ width: "70px", height: "70px", marginBottom: "8px" }}
            />
            <h1 className="text-lg font-semibold" style={{ margin: "0" }}>
              Delete Doctors
            </h1>
          </button>
        </div>
        <hr
          style={{
            borderTop: "1px solid rgba(128, 0, 128, 0.5)",
            margin: "20px auto",
          }}
        />

       

      </div>

      <AddPatientModal
        isOpen={isAddPatientModalOpen}
        onClose={handleAddPatientModalClose}
        size="5xl"
      />
      <AddDoctorModal
        isOpen={isAddDoctorModalOpen}
        onClose={handleAddDoctorModalClose}
        size="5xl"
      />
      <ViewPatientModal
        isOpen={isViewPatientModalOpen}
        onClose={handleViewPatientModalClose}
        size="5xl"
      />
      <ViewDoctorModal
        isOpen={isViewDoctorModalOpen}
        onClose={handleViewDoctorModalClose}
        size="5xl"
      />
      <UpdatePatientModal
        isOpen={isUpdatePatientModalOpen}
        onClose={handleUpdatePatientModalClose}
      />
      <UpdateDoctorModal
        isOpen={isUpdateDoctorModalOpen}
        onClose={handleUpdateDoctorModalClose}
      />
      <DeletePatientModal
        isOpen={isDelePatientModalOpen}
        onClose={handleDeletePatientModalClose}
      />
      <DeleteDoctorModal
        isOpen={isDeleteDoctorModalOpen}
        onClose={handleDeleteDoctorModalClose}
      />
    </div>
  );
};

export default AdminDashboard;
