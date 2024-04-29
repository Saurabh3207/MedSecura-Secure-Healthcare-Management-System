const { DataTypes } = require("sequelize");
const sequelize = require("../db");

// Admin Model
const Admin = sequelize.define(
	"Admin",
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		otp: {
			type: DataTypes.STRING, // Add OTP field
		},
	},
	{
		tableName: "admins",
	}
);

// Receptionist Model
// const Receptionist = sequelize.define('Receptionist', {
//   id: {
//     type: DataTypes.INTEGER,
//     primaryKey: true,
//     autoIncrement: true
//   },
//   email: {
//     type: DataTypes.STRING,
//     allowNull: false,
//     unique: true
//   },
//   password: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   otp: {
//     type: DataTypes.STRING // Add OTP field
//   }
// }, {
//   tableName: 'receptionists'
// });

// Doctor Model
const Doctor = sequelize.define(
	"doctors",
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		otp: {
			type: DataTypes.STRING, // Add OTP field
		},
		specialty: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		contactNumber: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		address: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		qualification: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		tableName: "doctors",
	}
);

// Patient Model
const Patient = sequelize.define(
	"patient",
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		otp: {
			type: DataTypes.STRING,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		middleName: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		lastName: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		dateOfBirth: {
			type: DataTypes.DATE,
			allowNull: false,
		},
		gender: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		ABHAID: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		homeAddress: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		bloodGroup: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		martialStatus: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		age: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		occupation: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		Religion: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		contactNumber: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		tableName: "patients",
	}
);
// Appointment Model
const Appointment = sequelize.define(
    "Appointment",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        patient_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        doctor_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        appointment_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
        },
        next_visit_date: {
            type: DataTypes.DATE,
        },
        status: {
            type: DataTypes.ENUM("Pending", "Completed"),
            defaultValue: "Pending",
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        tableName: "appointments",
        timestamps: true, // This option automatically adds createdAt and updatedAt fields
        underscored: true, // This option converts camelCase column names to snake_case
    }
);


module.exports = {
	Admin,
	Doctor,
	Appointment,
	Patient,
};
