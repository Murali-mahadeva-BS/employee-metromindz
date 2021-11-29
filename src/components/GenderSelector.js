import React from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import FormHelperText from "@mui/material/FormHelperText";

function GenderSelector({ value, handleChange, error, helperText }) {
  return (
    <FormControl fullWidth error={error} required>
      <InputLabel id="demo-simple-select-label">Gender</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={value}
        label="Gender"
        placeholder="Select your gender"
        onChange={handleChange}
      >
        <MenuItem value={"Male"}>Male</MenuItem>
        <MenuItem value={"Female"}>Female</MenuItem>
        <MenuItem value={"Others"}>Others</MenuItem>
      </Select>
      <FormHelperText>{helperText}</FormHelperText>
    </FormControl>
  );
}

export default GenderSelector;
