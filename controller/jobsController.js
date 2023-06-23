import Job from "../models/Job.js";
import { StatusCodes } from "http-status-codes";
import {
  BadRequestError,
  NotFoundError,
  UnAuthenticated,
} from "../errors/index.js";

const createJob = async (req, res) => {
  const { position, company } = req.body;

  console.log(req);

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
  const result = await Job.findByIdAndUpdate(
    id,
    { position, company },
    { new: true }
  );

  res.status(StatusCodes.OK).json({ result });
};

const deleteJob = async (req, res) => {
  res.send("delete job");
};
const showStats = async (req, res) => {
  res.send("show job");
};

export { createJob, getAllJob, updateJob, deleteJob, showStats };
