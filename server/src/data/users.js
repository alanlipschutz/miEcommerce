import bcrypt from "bcryptjs";

const users = [
  {
    name: "Admin user",
    email: "admin@commerce.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "John Doe",
    email: "john@commerce.com",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    name: "Jane Doe",
    email: "jane@commerce.com",
    password: bcrypt.hashSync("123456", 10),
  },
];

export default users;
