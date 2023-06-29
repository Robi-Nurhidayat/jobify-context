import React, { useEffect } from "react";
import { useAppContext } from "../../context/appContext";
import { ChartsContainer, Loading, StatsContainer } from "../../components";

function Stats() {
  const { showStats, stats, isLoading, monthly } = useAppContext();
  useEffect(() => {
    showStats();
  }, []);

  if (isLoading) {
    return <Loading center />;
  }

  return (
    <>
      <StatsContainer />
      {monthly.length > 0 && <ChartsContainer />}
    </>
  );
}

export default Stats;
