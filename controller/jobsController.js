import Job from "../models/Job.js";
import { StatusCodes } from "http-status-codes";
import {
  BadRequestError,
  NotFoundError,
  UnAuthenticated,
} from "../errors/index.js";
import checkPermission from "../utils/checkPermission.js";
import mongoose from "mongoose";
import moment from "moment";

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
  const { status, jobType, sort, search } = req.query;

  const queryObject = {
    createdBy: req.user.userId,
  };

  // add stuff on base condition

  if (status && status !== "all") {
    queryObject.status = status;
  }

  if (jobType && jobType !== "all") {
    queryObject.jobType = jobType;
  }

  if (search) {
    queryObject.position = { $regex: search, $options: "i" };
    // queryObject.position = search;
  }
  // No AWAIT
  let result = Job.find(queryObject);

  // Chain sort condition

  if (sort === "latest") {
    result = result.sort("-createdAt");
  }
  if (sort === "oldest") {
    result = result.sort("createdAt");
  }
  if (sort === "a-z") {
    result = result.sort("position");
  }
  if (sort === "z-a") {
    result = result.sort("-position");
  }

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);

  const jobs = await result;

  const totalJobs = await Job.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalJobs / limit);
  res.status(StatusCodes.OK).json({ jobs, totalJobs, numOfPages });
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

  let monthlyApplication = await Job.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
    {
      $group: {
        _id: {
          year: {
            $year: "$createdAt",
          },
          month: {
            $month: "$createdAt",
          },
        },
        count: { $sum: 1 },
      },
    },
    { $sort: { "_id.year": -1, "_id.month": -1 } },
    { $limit: 6 },
  ]);

  monthlyApplication = monthlyApplication
    .map((item) => {
      const {
        _id: { year, month },
        count,
      } = item;

      const date = moment()
        .month(month - 1)
        .year(year)
        .format("MMM Y");

      return { date, count };
    })
    .reverse();
  res.status(StatusCodes.OK).json({ defaultStats, monthlyApplication });
};

export { createJob, getAllJob, updateJob, deleteJob, showStats };
