const getAllJobs = (req, res) => {
  res.send("all jobs fetched");
};
const getJob = (req, res) => {
  res.send("single jobs fetched");
};
const createJob = (req, res) => {
  res.send("job created");
};
const updateJob = (req, res) => {
  res.send("job updated");
};
const removeJob = (req, res) => {
  res.send("job removed");
};

module.exports = {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  removeJob,
};
