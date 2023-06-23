import Wrapper from "../assets/wrappers/JobsContainer";
import Loading from "./Loading";
import Jobs from "./Jobs";
import { useAppContext } from "../context/appContext";
import { useEffect } from "react";

const JobsContainer = () => {
  const { getJobs, jobs, isLoading, page, totalJobs } = useAppContext();

  useEffect(() => {
    getJobs();
  }, []);

  if (isLoading) {
    return <Loading center />;
  }

  if (jobs.length === 0) {
    return (
      <Wrapper>
        <h2>No jobs to display...</h2>
      </Wrapper>
    );
  }

  console.log(jobs);
  return (
    <Wrapper>
      <h5>
        {totalJobs} job{jobs.length > 1 && "s"} found
      </h5>
      <div className="jobs">
        {jobs.map((job) => {
          return <Jobs key={job._id} {...job} />;
        })}
      </div>

      {/* pagination button */}
    </Wrapper>
  );
};

export default JobsContainer;
