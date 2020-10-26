import bcrypt from "bcryptjs";

const users = [
  {
    name: "admin1",
    email: "admin1@deneme.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "deneme1",
    email: "deneme1@deneme.com",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    name: "deneme2",
    email: "deneme2@deneme.com",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    name: "deneme3",
    email: "deneme3@deneme.com",
    password: bcrypt.hashSync("123456", 10),
  },
];

export default users;
