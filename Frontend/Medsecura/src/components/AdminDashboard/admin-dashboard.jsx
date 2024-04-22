// src/components/Navbar.js
import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  Link,
  Input,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
} from "@nextui-org/react";
import { LogoImage } from "./logo.jsx";
import { SearchIcon } from "./SearchIcon.jsx";
import { IconLogout } from "@tabler/icons-react";
import ViewPatient from "../Assets/ICONS/patient.png";
import AddPatient from "../Assets/ICONS/AddPatient.png";
import UpdatePatient from "../Assets/ICONS/updatpatient.png";
import AlertIcon from "../Assets/ICONS/fire alert.png";
import FeedbackIcon from "../Assets/ICONS/feedback.png";
import AddDoctorIcon from "../Assets/ICONS/AddDoctor.jpg";
import ViewDoctorIcon from "../Assets/ICONS/doctor.png";
import UpdateDoctorIcon from "../Assets/ICONS//updatedoctor.png";
import AdminUpdateProfile from "../Assets/ICONS/updateprofile.jpg";
import AddReceptionist from "../Assets/ICONS/Add receptionist.png";
import ViewReceptionist from "../Assets/ICONS/ViewReceptionist.jpg";

const AdminDashboard = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location.href = "/login";
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
          <Input
            classNames={{
              base: "max-w-full sm:max-w-[16rem] h-10",
              mainWrapper: "h-full",
              input: "text-small",
              inputWrapper:
                "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
            }}
            placeholder="Type to search..."
            size="sm"
            startContent={
              <SearchIcon
                size={18}
                style={{ color: "#00c7d7", fontWeight: "bold" }}
                className="mr-2"
              />
            }
            type="search"
          />
           <Avatar
                isBordered
                as="button"
                className="transition-transform"
                color="secondary"
                name="Jason Hughes"
                size="sm"
                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
              />

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
        <hr style={{ borderTop: "1px solid rgba(128, 0, 128, 0.5)", margin: "20px auto" }} />
        <div className="flex items-center gap-10 mt-4">
        <button className="text-center flex flex-col items-center" onClick={() => handleIconClick('UpdatePatients')}>
    <img src={AlertIcon} alt="Alert" style={{ width: '70px', height: '70px', marginBottom: '8px' }} />
    <h1 className="text-lg font-semibold" style={{ margin: '0' }}>Fire Alert</h1>
  </button>
  <button className="text-center flex flex-col items-center" onClick={() => handleIconClick('UpdatePatients')}>
    <img src={AdminUpdateProfile} alt="Update Profile" style={{ width: '70px', height: '70px', marginBottom: '8px' }} />
    <h1 className="text-lg font-semibold" style={{ margin: '0' }}>Update Profile</h1>
  </button>
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
  <button className="text-center flex flex-col items-center" onClick={() => handleIconClick('ViewPatients')}>
    <img src={ViewPatient} alt="View Patients" style={{ width: '70px', height: '70px', marginBottom: '8px' }} />
    <h1 className="text-lg font-semibold" style={{ margin: '0' }}>View Patients</h1>
  </button>
  <button className="text-center flex flex-col items-center" onClick={() => handleIconClick('AddPatients')}>
    <img src={AddPatient} alt="Add Patients" style={{ width: '70px', height: '70px', marginBottom: '8px' }} />
    <h1 className="text-lg font-semibold" style={{ margin: '0' }}>Add Patients</h1>
  </button>
  <button className="text-center flex flex-col items-center" onClick={() => handleIconClick('UpdatePatients')}>
    <img src={UpdatePatient} alt="Update Patients" style={{ width: '70px', height: '70px', marginBottom: '8px' }} />
    <h1 className="text-lg font-semibold" style={{ margin: '0' }}>Update Patients</h1>
  </button>
  <button className="text-center flex flex-col items-center" onClick={() => handleIconClick('UpdatePatients')}>
    <img src={FeedbackIcon} alt="Patients Feedback" style={{ width: '70px', height: '70px', marginBottom: '8px' }} />
    <h1 className="text-lg font-semibold" style={{ margin: '0' }}>Feedbacks</h1>
  </button>
</div>

{/* Horizontal line above Doctor section */}
<hr style={{ borderTop: "1px solid rgba(128, 0, 128, 0.5)", margin: "20px auto" }} />

{/* Doctor Section heading */}
<h1 className="text-2xl font-bold mt-4">Doctors Sections...!</h1>

{/* Horizontal line below Doctor section */}
<hr style={{ borderTop: "1px solid rgba(128, 0, 128, 0.5)", margin: "20px auto" }} />
<div className="flex items-center gap-10 mt-4">
  <button className="text-center flex flex-col items-center" onClick={() => handleIconClick('ViewPatients')}>
    <img src={ViewDoctorIcon} alt="View Doctors" style={{ width: '70px', height: '70px', marginBottom: '8px' }} />
    <h1 className="text-lg font-semibold" style={{ margin: '0' }}>View Doctors</h1>
  </button>
  <button className="text-center flex flex-col items-center" onClick={() => handleIconClick('AddPatients')}>
    <img src={AddDoctorIcon} alt="Add Doctors" style={{ width: '70px', height: '70px', marginBottom: '8px' }} />
    <h1 className="text-lg font-semibold" style={{ margin: '0' }}>Add Doctors</h1>
  </button>
  <button className="text-center flex flex-col items-center" onClick={() => handleIconClick('UpdatePatients')}>
    <img src={UpdateDoctorIcon} alt="Update Doctors" style={{ width: '70px', height: '70px', marginBottom: '8px' }} />
    <h1 className="text-lg font-semibold" style={{ margin: '0' }}>Update Doctors</h1>
  </button>
</div>
<hr style={{ borderTop: "1px solid rgba(128, 0, 128, 0.5)", margin: "20px auto" }} />
      
{/*Receptionist Section heading */}
<h1 className="text-2xl font-bold mt-4">Receptionist Sections...!</h1>

{/* Horizontal line below Doctor section */}
<hr style={{ borderTop: "1px solid rgba(128, 0, 128, 0.5)", margin: "20px auto" }} />
<div className="flex items-center gap-10 mt-4">
  <button className="text-center flex flex-col items-center" onClick={() => handleIconClick('ViewPatients')}>
    <img src={ViewReceptionist} alt="View Receptionist" style={{ width: '70px', height: '70px', marginBottom: '8px' }} />
    <h1 className="text-lg font-semibold" style={{ margin: '0' }}>View Receptionist</h1>
  </button>
  <button className="text-center flex flex-col items-center" onClick={() => handleIconClick('AddPatients')}>
    <img src={AddReceptionist} alt="Add Receptionist" style={{ width: '70px', height: '70px', marginBottom: '8px' }} />
    <h1 className="text-lg font-semibold" style={{ margin: '0' }}>Add Receptionist</h1>
  </button>
 
</div>
      </div>
    </div>
  );
};


export default AdminDashboard;
