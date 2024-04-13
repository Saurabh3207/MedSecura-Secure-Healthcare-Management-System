import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./src/components/Login/Login";
import OTPVerification from "./src/components/Login/OTPVerification";
import AdminDashboard from "./src/components/AdminDashboard/admin-dashboard";
import ReceptionistDashboard from "./src/components/ReceptionistDashboard/ReceptionistDashboard";
import DoctorDashboard from "./src/components/DoctorDashboard/DoctorDashboard";
import PatientDashboard from "./src/components/PatientDashboard/PatientDashboard";

function App() {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    // Check if the user is authenticated
    const isAuthenticated = token && role;

    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/otp-verification" element={<OTPVerification />} />

            {/* Protected Routes */}
            {isAuthenticated ? (
                <>
                    {role === 'admin' && <Route path="/admin/dashboard" element={<AdminDashboard />} />}
                    {role === 'receptionist' && <Route path="/receptionist/dashboard" element={<ReceptionistDashboard />} />}
                    {role === 'doctor' && <Route path="/doctor/dashboard" element={<DoctorDashboard />} />}
                    {role === 'patient' && <Route path="/patient/dashboard" element={<PatientDashboard />} />}
                </>
            ) : (
                // Redirect to login page if not authenticated
                <Route path="*" element={<Navigate to="/login" replace />} />
            )}
        </Routes>
    );
}

export default App;
