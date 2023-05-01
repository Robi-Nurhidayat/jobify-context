import React from "react";
import Landing from "./pages/Landing";
import styled from "styled-components";

const Button = styled.button`
  background: red;
  color: white;
  font-size: 1rem;
`;

function App() {
  return (
    <div>
      <Button>Clic</Button>
      <h1>jobify</h1>
      <Landing />
    </div>
  );
}

export default App;
