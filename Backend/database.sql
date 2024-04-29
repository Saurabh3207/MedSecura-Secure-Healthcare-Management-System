BEGIN TRANSACTION;

CREATE TABLE if not exists admins (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    otp TEXT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE if not exists doctors (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    name TEXT NOT NULL,
    otp TEXT,
    specialty TEXT NOT NULL,
    contactNumber TEXT NOT NULL,
    address TEXT NOT NULL,
    qualification TEXT NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE if not exists patients (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    otp TEXT,
    name TEXT NOT NULL,
    middleName TEXT NOT NULL,
    lastName TEXT NOT NULL,
    dateOfBirth TEXT NOT NULL,
    gender TEXT NOT NULL,
    ABHAID TEXT NOT NULL,
    homeAddress TEXT NOT NULL,
    bloodGroup TEXT NOT NULL,
    martialStatus TEXT NOT NULL,
    contactNumber TEXT NOT NULL,
    age TEXT NOT NULL,
    occupation TEXT NOT NULL,
    religion TEXT NOT Null,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS appointments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    patientId INTEGER NOT NULL,
    doctorId INTEGER NOT NULL,
    appointmentDate DATETIME NOT NULL,
    description TEXT,
    nextVisitDate DATETIME,
    status TEXT DEFAULT 'Pending' CHECK(status IN ('Pending', 'Completed')),
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (patientId) REFERENCES patients(id),
    FOREIGN KEY (doctorId) REFERENCES doctors(id)
);



COMMIT;

