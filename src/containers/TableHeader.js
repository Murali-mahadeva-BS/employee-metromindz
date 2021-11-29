import React from "react";
import { Box, Typography, Button } from "@mui/material";

function TableHeader({ onClickReset, onClickCreate }) {
  return (
    <Box
      display="flex"
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      paddingX={4}
      paddingY={1}
    >
      <Typography variant="h4">Employees</Typography>
      <Box>
        <Button variant="contained" onClick={onClickCreate}>
          Create Employee
        </Button>
        <Button
          variant="contained"
          onClick={onClickReset}
          sx={{ marginLeft: 1 }}
        >
          Reset sorting
        </Button>
      </Box>
    </Box>
  );
}

export default TableHeader;
