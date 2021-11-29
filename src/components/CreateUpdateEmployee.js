import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Stack from "@mui/material/Stack";
import GenderSelector from "./GenderSelector";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup
  .object({
    username: yup.string().required(),
    email: yup.string().required().email(),
    phone: yup.string().required().length(10),
    gender: yup.string().required(),
  })
  .required();
function CreateUpdateEmployee({
  open,
  handleClose,
  handleCreate,
  onUpdate,
  type,
  data,
}) {
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    // defaultValues: {
    //   // username: data.username ? data.username : "",
    //   // email: data.email ? data.email : "",
    //   // phone: data.phone ? data.phone : "",
    //   // gender: data.gender ? data.gender : "",
    //   username: "",
    //   email: "",
    //   phone: "",
    //   gender: "",
    // },
  });
  const onSubmit = (data) => {
    reset();
    handleClose();
    type === "update" ? onUpdate(data) : handleCreate(data);
  };
  return (
    <form>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-Editdialog-title">{`${
          type === "update" ? "Update" : "Create"
        } Employee`}</DialogTitle>
        <DialogContent>
          <Stack width={500} p={1} spacing={2}>
            <Controller
              name="username"
              control={control}
              inputRef={register}
              defaultValue={data.username && data.username}
              render={({ field }) => (
                <TextField
                  label="Username"
                  placeholder="Enter username"
                  variant="outlined"
                  required
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                  error={!!errors.username}
                  helperText={errors.username && errors.username.message}
                  {...field}
                />
              )}
            />
            <Controller
              name="email"
              control={control}
              defaultValue={data.email && data.email}
              render={({ field }) => (
                <TextField
                  label="Email"
                  placeholder="Enter Email"
                  variant="outlined"
                  required
                  value={field.value}
                  onChange={field.onChange}
                  error={Boolean(errors.email)}
                  helperText={errors.email && errors.email.message}
                  {...field}
                />
              )}
            />
            <Controller
              name="phone"
              control={control}
              defaultValue={data.phone && data.phone}
              render={({ field }) => (
                <TextField
                  label="Phone number"
                  placeholder="Enter Phone number"
                  variant="outlined"
                  required
                  value={field.value}
                  onChange={field.onChange}
                  error={Boolean(errors.phone)}
                  helperText={errors.phone && errors.phone.message}
                  {...field}
                />
              )}
            />
            <Controller
              name="gender"
              control={control}
              defaultValue={data.gender && data.gender}
              render={({ field }) => (
                <GenderSelector
                  value={field.value}
                  handleChange={field.onChange}
                  error={Boolean(errors.gender)}
                  helperText={errors.gender && errors.gender.message}
                  {...field}
                />
              )}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              reset();
              handleClose();
            }}
          >
            Cancel
          </Button>
          <Button onClick={handleSubmit(onSubmit)}>{`${
            type === "update" ? "Update" : "Create"
          }`}</Button>
        </DialogActions>
      </Dialog>
    </form>
  );
}

export default CreateUpdateEmployee;
