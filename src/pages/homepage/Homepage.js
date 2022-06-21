import React from "react";
import Card from "../../components/card/Card";
import { HomeContainer } from "./HomepageElements";

const Homepage = () => {
  return (
    <>
      <HomeContainer>
        <h1>todos</h1>
        <Card />
      </HomeContainer>
    </>
  );
};

export default Homepage;
