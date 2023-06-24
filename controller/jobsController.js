import Job from "../models/Job.js";
import { StatusCodes } from "http-status-codes";
import {
  BadRequestError,
  NotFoundError,
  UnAuthenticated,
} from "../errors/index.js";
import checkPermission from "../utils/checkPermission.js";
import mongoose from "mongoose";

const createJob = async (req, res) => {
  const { position, company } = req.body;

  if (!position || !company) {
    throw new BadRequestError("Please provide all values");
  }

  req.body.createdBy = req.user.userId;

  const job = await Job.create(req.body);

  res.status(StatusCodes.CREATED).json({ job });
};
const getAllJob = async (req, res) => {
  const jobs = await Job.find({ createdBy: req.user.userId });
  res
    .status(StatusCodes.OK)
    .json({ jobs, totalJobs: jobs.length, numOfPages: 1 });
};
const updateJob = async (req, res) => {
  const id = req.params.id;

  const { position, company } = req.body;

  if (!position || !company) {
    throw new BadRequestError("Please provide all values");
  }

  const job = await Job.findOne({ _id: id });
  if (!job) {
    throw new NotFoundError(`No job with id: ${id}`);
  }

  checkPermission(req.user, job.createdBy);

  const result = await Job.findByIdAndUpdate(
    id,
    { position, company },
    { new: true }
  );

  res.status(StatusCodes.OK).json({ result });
};

const deleteJob = async (req, res) => {
  const id = req.params.id;

  const job = await Job.findOne({ _id: id });
  if (!job) {
    throw new NotFoundError("job tidak ditemukan");
  }

  checkPermission(req.user, job.createdBy);

  await Job.findByIdAndDelete(id);

  res.status(StatusCodes.OK).json({ msg: "Success, Job removed" });
};
const showStats = async (req, res) => {
  let stats = await Job.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
    { $group: { _id: "$status", count: { $sum: 1 } } },
  ]);

  stats = stats.reduce((acc, curr) => {
    const { _id: title, count } = curr;
    acc[title] = count;
    return acc;
  }, {});

  const defaultStats = {
    pending: stats.pending || 0,
    interview: stats.interview || 0,
    declined: stats.declined || 0,
  };

  let monthlyApplication = [];
  res.status(StatusCodes.OK).json({ defaultStats, monthlyApplication });
};

export { createJob, getAllJob, updateJob, deleteJob, showStats };
