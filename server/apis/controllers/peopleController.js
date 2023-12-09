const User = require("../models/user");

const getPeopleController = async (req, res) => {
  try {
    const users = await User.find({});
    const shuffledUsers = users.sort(() => Math.random() - 0.5);
    res.send({
      status: 200,
      message: "Users fetched successfully",
      users: shuffledUsers
    });
  } catch (error) {}
};

module.exports = {
  getPeopleController
};
