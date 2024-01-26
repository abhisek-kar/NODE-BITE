const testUserController = (req, res) => {
  try {
    res.status(200).send("<h1>Test user Data</h1>");
  } catch (error) {
    console.log("error In Test API", error);
    res.status(500).send("Internal server error");
  }
};

module.exports = { testUserController };
