module.exports.internalError = (error, res) => {
  console.log(error);
  res.status(500).send("Internal Server Error");
};
