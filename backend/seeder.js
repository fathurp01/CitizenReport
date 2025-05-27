const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const sequelize = require('./config/database');
const { User } = require('./models');

// Load environment variables
dotenv.config();

// Create admin user
const createAdmin = async () => {
  try {
    // Check if admin already exists
    const adminExists = await User.findOne({ where: { email: 'admin@example.com' } });
    
    if (adminExists) {
      console.log('Admin user already exists');
      return;
    }
    
    // Create admin user
    const admin = await User.create({
      fullName: 'Admin User',
      email: 'admin@example.com',
      password: 'admin123',  // Will be hashed by the model hook
      phoneNumber: '123456789',
      address: 'Admin Address',
      rt: '001',
      rw: '001',
      role: 'admin'
    });
    
    console.log('Admin user created:', admin.email);
  } catch (error) {
    console.error('Error creating admin user:', error);
  }
};

// Create staff user
const createStaff = async () => {
  try {
    // Check if staff already exists
    const staffExists = await User.findOne({ where: { email: 'staff@example.com' } });
    
    if (staffExists) {
      console.log('Staff user already exists');
      return;
    }
    
    // Create staff user
    const staff = await User.create({
      fullName: 'Staff User',
      email: 'staff@example.com',
      password: 'staff123',  // Will be hashed by the model hook
      phoneNumber: '987654321',
      address: 'Staff Address',
      rt: '002',
      rw: '002',
      role: 'village_staff'
    });
    
    console.log('Staff user created:', staff.email);
  } catch (error) {
    console.error('Error creating staff user:', error);
  }
};

// Run seeders
const seedData = async () => {
  try {
    // Sync database
    await sequelize.sync({ alter: true });
    console.log('Database synced');
    
    await createAdmin();
    await createStaff();
    
    console.log('Data seeding completed');
    process.exit();
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

// Run the seeder
seedData();