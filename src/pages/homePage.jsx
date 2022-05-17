import React from "react";
import Grid from "@mui/material/Grid";
import NavBar from "../components/navigation";
import RecipeReviewCard from "../components/card";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

function homePage() {
  return (
    <div>
      <NavBar />

      <Grid container spacing={5} style={styles}>
        {[1, 4, 4].map((item) => (
          <Grid item xs={12} md={4} xl={4}>
            <RecipeReviewCard />
          </Grid>
        ))}
      </Grid>
      <div style={styles.pagination}>
        <Stack spacing={2} style={styles.paginationChid}>
          <Pagination count={10} color='primary' />
        </Stack>
      </div>
    </div>
  );
}

export default homePage;

const styles = {
  margin: "10px 0px",
  pagination: {
    position: "relative"
  },

  paginationChid: {
    position: "absolute",
    // top: "-70%",
    left: "50%",
    transform: "translate(-50%, 50%)"
  }
};
