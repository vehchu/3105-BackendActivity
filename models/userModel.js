import fs from 'fs';
import path from 'path';

// Path to the JSON file
const usersFilePath = path.join(process.cwd(), 'data/users.json');

// Helper function to read from JSON file
const readUsersFromFile = () => {
  const data = fs.readFileSync(usersFilePath, 'utf-8'); // Specify 'utf-8' encoding
  return JSON.parse(data);
};

// Helper function to write to JSON file
const writeUsersToFile = (users) => {
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2), 'utf-8');
};

// Functions to export
const findUserByUsername = (username) => {
  const users = readUsersFromFile();
  return users.find(user => user.username === username);
};

const createUser = (user) => {
  const users = readUsersFromFile();
  users.push(user);
  writeUsersToFile(users);
};

const getAllUsers = () => {
  return readUsersFromFile();
};

// Exporting all the functions as default
export default {
  findUserByUsername,
  createUser,
  getAllUsers
};
