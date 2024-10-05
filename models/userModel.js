import fs from 'fs'
import path from 'path'

const usersFilePath = path.join(process.cwd(), 'data/users.json')

// Read from JSON file
const readUsersFromFile = () => {
  const data = fs.readFileSync(usersFilePath, 'utf-8')
  return JSON.parse(data)
}

// Write to JSON file
const writeUsersToFile = (users) => {
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2), 'utf-8')
}

// Functions to export
const findUserByUsername = (username) => {
  const users = readUsersFromFile()
  return users.find(user => user.username === username)
}

const generateUniqueId = (users) => {
    if (users.length === 0) return 1 // Start IDs at 1 if no users exist
    const maxId = users.reduce((max, user) => Math.max(max, user.id), 0)
    return maxId + 1 // Assign the next ID
}

const createUser = (user) => {
  const users = readUsersFromFile()
  const newUser = {
    ...user,
    id: generateUniqueId(users)
  }
  users.push(newUser)
  writeUsersToFile(users)

  return newUser
}

const getAllUsers = () => {
  return readUsersFromFile()
}

export default {
  findUserByUsername, createUser, getAllUsers
}
