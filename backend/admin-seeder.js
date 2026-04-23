const adminDetails = require("./models/details/admin-details.model");
const connectToMongo = require("./Database/db");
const mongoose = require("mongoose");

const seedData = async () => {
  try {
    await connectToMongo();

    // Clear existing admin data
    await adminDetails.deleteMany({});

    const password = "Harsh@123"; // you can change this
    const employeeId = 875035; // derived from your phone for uniqueness

    const adminDetail = {
      employeeId: employeeId,
      firstName: "Harsh",
      middleName: "",
      lastName: "Pachauri",
      email: "pachauriharsh2005@gmail.com",
      phone: "8750350158",
      profile: "harsh.jpg",
      address: "Badarpur",
      city: "Delhi",
      state: "Delhi",
      pincode: "110044",
      country: "India",
      gender: "male",
      dob: new Date("2005-03-20"),
      designation: "System Administrator",
      joiningDate: new Date(),
      salary: 60000,
      status: "active",
      isSuperAdmin: true,
      emergencyContact: {
        name: "Emergency Contact",
        relationship: "Parent",
        phone: "8750350158",
      },
      bloodGroup: "O+",
      password: password,
    };

    await adminDetails.create(adminDetail);

    console.log("\n=== Admin Credentials ===");
    console.log("Employee ID:", employeeId);
    console.log("Password:", password);
    console.log("Email:", adminDetail.email);
    console.log("=======================\n");
    console.log("Seeding completed successfully!");
  } catch (error) {
    console.error("Error while seeding:", error);
  } finally {
    await mongoose.connection.close();
    process.exit();
  }
};

seedData();