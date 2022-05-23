import User from "../schemas/userSchema.js";

const registerUser = async ({ name, email, password }) => {
  const user = await User.create({ name, email, password });
  return user;
};
const authUser = async ({ email }) => {
  const user = await User.findOne({ email });
  return user;
};

const findUserById = async (id) => {
  const user = await User.findById(id);
  return user;
};

export default { authUser, findUserById, registerUser };
