import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { LinearProgress } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
};

export default function Loader({ open }) {
  return (
    <Modal open={open} onClose={() => {}}>
      <Box sx={style}>
        <LinearProgress />
      </Box>
    </Modal>
  );
}
