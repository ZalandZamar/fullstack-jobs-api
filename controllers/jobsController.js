const Job = require("../models/Job");
const { StatusCodes } = require("http-status-codes");
const { unauthenticatedError, badREquest, notFound } = require("../errors");

const getAllJobs = async (req, res) => {
  const job = await Job.find({ createdBy: req.user.userId });

  if (!job) {
    throw new notFound("no jobs found");
  }

  res.status(StatusCodes.OK).json({ job, jobsCount: job.length });
};

const getJob = async (req, res) => {
  const {
    user: { userId },
    params: { id: jobId },
  } = req;

  const job = await Job.findOne({ _id: jobId, createdBy: userId });

  if (!job) {
    throw new notFound("job not found");
  }

  res.status(StatusCodes.OK).json({ job });
};

const createJob = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json({ job });
};

const updateJob = async (req, res) => {
  const {
    body: { company, position },
    user: { userId },
    params: { id: jobId },
  } = req;

  if (!company || !position) {
    throw new badREquest("please provide company and position");
  }

  const job = await Job.findOneAndUpdate(
    { _id: jobId, createdBy: userId },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!job) {
    throw new notFound("no job found");
  }

  res.status(StatusCodes.OK).json({ job });
};

const removeJob = async (req, res) => {
  const {
    user: { userId },
    params: { id: jobId },
  } = req;

  const job = await Job.findOneAndDelete({ _id: jobId, createdBy: userId });

  if (!job) {
    throw new notFound("no job found");
  }

  res.status(StatusCodes.OK).json({ job });
};

module.exports = {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  removeJob,
};
