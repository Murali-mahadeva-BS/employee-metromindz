import * as React from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import TableSortLabel from "@mui/material/TableSortLabel";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { visuallyHidden } from "@mui/utils";
import DeleteDialog from "../components/DeleteDialog";

function Row({ employee, handleUpdate, getDeleteEmployeeConfirmation }) {
  const [open, setOpen] = React.useState(false);

  return (
    <TableBody key={employee._id}>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell align="left">{employee.username}</TableCell>
        <TableCell align="left">{employee.email}</TableCell>
        <TableCell align="center">{employee.phone}</TableCell>
        <TableCell align="center">{employee.gender}</TableCell>
        <TableCell align="center">
          <Button
            variant="outlined"
            startIcon={<DeleteIcon />}
            // onClick={() => handleDelete(employee._id)}
            onClick={() =>
              getDeleteEmployeeConfirmation(employee.username, employee._id)
            }
          >
            Delete
          </Button>
        </TableCell>
        <TableCell align="center">
          <Button
            variant="outlined"
            startIcon={<EditIcon />}
            onClick={() => handleUpdate(employee)}
          >
            Edit
          </Button>
        </TableCell>
      </TableRow>
    </TableBody>
  );
}

const columns = [
  { id: "username", label: "Username", minWidth: 100, align: "left" },
  { id: "email", label: "Email", minWidth: 100, align: "left" },
  {
    id: "phone",
    label: "Phone",
    minWidth: 100,
    align: "center",
  },
  { id: "gender", label: "Gender", minWidth: 100, align: "center" },
  { id: "edit", label: "Edit", minWidth: 100, align: "center" },
  { id: "delete", label: "Delete", minWidth: 100, align: "center" },
];

export default function TableList({
  employees,
  page,
  perPage,
  handleChangePage,
  handleChangePerPage,
  totalEmployees,
  orderBy,
  order,
  sortHandler,
  handleUpdate,
  handleDelete,
}) {
  const createSortHandler = (property) => (event) => {
    sortHandler(event, property);
  };
  const [state, setState] = React.useState({
    deleteDialog: false,
    editDialog: false,
    createDialog: false,
    deleteEmployeeUsername: "",
    deleteEmployeeId: "",
  });
  const getDeleteEmployeeConfirmation = (username, id) => {
    setState((prevState) => ({
      ...prevState,
      deleteDialog: true,
      deleteEmployeeId: id,
      deleteEmployeeUsername: username,
    }));
  };
  const handleCloseDeleteEmployeeDialog = () => {
    setState((prevState) => ({
      ...prevState,
      deleteDialog: false,
      deleteEmployeeId: "",
      deleteEmployeeUsername: "",
    }));
  };
  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 500 }}>
        <Table stickyHeader aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                    sortDirection={orderBy === column.id ? order : false}
                  >
                    {column.id === "username" || column.id === "email" ? (
                      <TableSortLabel
                        active={orderBy === column.id}
                        direction={orderBy === column.id ? order : "asc"}
                        onClick={createSortHandler(column.id)}
                      >
                        {column.label}
                        {orderBy === column.id ? (
                          <Box component="span" sx={visuallyHidden}>
                            {order === "desc"
                              ? "sorted descending"
                              : "sorted ascending"}
                          </Box>
                        ) : null}
                      </TableSortLabel>
                    ) : (
                      column.label
                    )}
                  </TableCell>
                ))}
              </>
            </TableRow>
          </TableHead>
          {employees.map((employee) => (
            <Row
              key={employee._id}
              employee={employee}
              handleDelete={handleDelete}
              handleUpdate={handleUpdate}
              getDeleteEmployeeConfirmation={getDeleteEmployeeConfirmation}
            />
          ))}
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 15, 25]}
        component="div"
        count={totalEmployees}
        rowsPerPage={perPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangePerPage}
      />
      {employees.length === 0 && (
        <Typography variant="h6" component="div" p={5} align="center">
          No items found
        </Typography>
      )}
      <DeleteDialog
        open={state.deleteDialog}
        handleClose={handleCloseDeleteEmployeeDialog}
        handleDelete={handleDelete}
        username={state.deleteEmployeeUsername}
        id={state.deleteEmployeeId}
      />
    </Paper>
  );
}
