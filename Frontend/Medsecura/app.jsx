import React, { useEffect } from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom"; // Import useNavigate
import Login from "./src/components/Login/Login";
import OTPVerification from "./src/components/Login/OTPVerification";
import AdminDashboard from "./src/components/AdminDashboard/admin-dashboard";
import ReceptionistDashboard from "./src/components/ReceptionistDashboard/ReceptionistDashboard";
import DoctorDashboard from "./src/components/DoctorDashboard/DoctorDashboard";
import PatientDashboard from "./src/components/PatientDashboard/PatientDashboard";

function App() {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    const navigate = useNavigate(); // Define navigate here

    useEffect(() => {
        if (token && role) {
            // Token and role exist, navigate to the appropriate dashboard
            switch (role) {
                case 'admin':
                    return navigate('/admin/dashboard');
                case 'receptionist':
                    return navigate('/receptionist/dashboard');
                case 'doctor':
                    return navigate('/doctor/dashboard');
                case 'patient':
                    return navigate('/patient/dashboard');
                default:
                    // Handle unexpected role
                    return navigate('/login');
            }
        }
    }, [token, role, navigate]); // Add navigate to dependencies

    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/otp-verification" element={<OTPVerification />} />

            {/* Protected Routes */}
            {token && role && (
                <>
                    {role === 'admin' && <Route path="/admin/dashboard" element={<AdminDashboard />} />}
                    {role === 'receptionist' && <Route path="/receptionist/dashboard" element={<ReceptionistDashboard />} />}
                    {role === 'doctor' && <Route path="/doctor/dashboard" element={<DoctorDashboard />} />}
                    {role === 'patient' && <Route path="/patient/dashboard" element={<PatientDashboard />} />}
                </>
            )}
            {/* Redirect to login page if not authenticated */}
            {!token && !role && <Route path="*" element={<Navigate to="/login" replace />} />}
        </Routes>
    );
}

export default App;
