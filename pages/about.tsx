import React from "react";
import Container from "@material-ui/core/Container";

import Navigation from "../components/Navigation";
import Hero from "../components/Hero";
import Posts from "../components/Posts";

export default function About() {
  return (
    <React.Fragment>
      <Navigation title={"About"} />
      <Container maxWidth="lg">
        <Hero />
        <Posts />
      </Container>
    </React.Fragment>
  );
}
