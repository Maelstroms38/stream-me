import React from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Link from "next/link";

import Navigation from "../components/Navigation";

export default function Index() {
  return (
    <React.Fragment>
      <Navigation title={"Welcome"} />
      <Container maxWidth="sm">
        <Box my={4}>
          <Typography variant="h4" component="h1" gutterBottom>
            Next.js example
          </Typography>
          <Link href="/about">Go to the about page</Link>
        </Box>
      </Container>
    </React.Fragment>
  );
}
