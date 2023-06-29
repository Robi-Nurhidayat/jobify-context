import React from "react";
import Wrapper from "../assets/wrappers/StatItem";

const StatItem = ({ count, title, icon, color, bcg }) => {
  return (
    <Wrapper color={color} bcg={bcg}>
      <header>
        <span className="count">{count}</span>
        <div className="icon">{icon}</div>
        <h5 className="title">{title}</h5>
      </header>
    </Wrapper>
  );
};

export default StatItem;
