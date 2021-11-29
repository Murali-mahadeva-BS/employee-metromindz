import React, { useState, useEffect, useRef } from "react";
import { Box, TextField, Button } from "@mui/material";
// import MultipleSelectChip from "../components/MultiSelectChip";
import Loader from "../components/Loader";
import TableHeader from "./TableHeader";
import TableList from "./TableList";
import {
  createEmployee,
  deleteEmployee,
  fetchEmployees,
  updateEmployee,
} from "../utils";
import CreateUpdateEmployee from "../components/CreateUpdateEmployee";

function Table({ setLoading }) {
  const [state, setState] = useState({
    employees: [],
    page: 0,
    perPage: 10,
    sort: "",
    totalEmployees: 0,
    orderBy: "",
    order: "",
    createOrUpdateEmployeeDialog: false,
    createOrUpdateType: "",
    updateEmployeeData: {},
  });
  useEffect(() => {
    getEmployees();
  }, [state.page, state.perPage, state.order, state.orderBy]);

  const handleCreateOrUpdateEmployeeDialogClose = () => {
    setState((prevState) => ({
      ...prevState,
      createOrUpdateEmployeeDialog: false,
      createOrUpdateType: "",
      updateEmployeeData: {},
    }));
  };
  const sortHandler = async (event, property) => {
    const { orderBy, order } = state;
    const isAsc = orderBy === property && order === "asc";
    setState((prevState) => ({
      ...prevState,
      order: isAsc ? "desc" : "asc",
      orderBy: property,
      page: 0,
    }));
  };
  const handleChangePage = async (event, page) => {
    setState((prevState) => ({ ...prevState, page }));
  };
  const onClickCreate = () => {
    setState((prevState) => ({
      ...prevState,
      createOrUpdateEmployeeDialog: true,
    }));
  };
  const onUpdate = async (body) => {
    setLoading(true);
    let { updateEmployeeData } = state;
    let resp = await updateEmployee(body, updateEmployeeData._id);
    await getEmployees();
  };
  const handleUpdate = async (body) => {
    setState((prevState) => ({
      ...prevState,
      createOrUpdateEmployeeDialog: true,
      createOrUpdateType: "update",
      updateEmployeeData: body,
    }));
  };

  const handleCreate = async (body) => {
    setLoading(true);
    let resp = await createEmployee(body);
    await getEmployees();
  };
  const handleDelete = async (id) => {
    setLoading(true);
    let resp = await deleteEmployee(id);
    await getEmployees();
  };
  const handleChangePerPage = async (event) => {
    setState((prevState) => ({
      ...prevState,
      perPage: event.target.value,
      page: 0,
    }));
  };
  const onClickReset = async () => {
    setState((prevState) => ({
      ...prevState,
      order: "",
      orderBy: "",
    }));
    setLoading(true);
    await getEmployees();
    setLoading(false);
  };
  const getEmployees = async () => {
    setLoading(true);
    const { page, perPage, order, orderBy } = state;
    let sort = orderBy && order ? `${orderBy},${order}` : "";
    let params = {
      page,
      perPage,
      sort,
    };
    let data = await fetchEmployees(params);
    if (data)
      setState((prevState) => ({
        ...prevState,
        employees: data.employees,
        totalEmployees: data.totalItems,
      }));
    setLoading(false);
  };
  return (
    <>
      <Box paddingTop={1}>
        <TableHeader
          onClickReset={onClickReset}
          onClickCreate={onClickCreate}
        />
        <Box paddingX={4} pt={1}>
          <TableList
            employees={state.employees}
            page={state.page}
            perPage={state.perPage}
            handleChangePage={handleChangePage}
            handleChangePerPage={handleChangePerPage}
            totalEmployees={state.totalEmployees}
            orderBy={state.orderBy}
            order={state.order}
            sortHandler={sortHandler}
            handleUpdate={handleUpdate}
            handleDelete={handleDelete}
          />
        </Box>
      </Box>
      <CreateUpdateEmployee
        open={state.createOrUpdateEmployeeDialog}
        handleClose={handleCreateOrUpdateEmployeeDialogClose}
        handleCreate={handleCreate}
        onUpdate={onUpdate}
        type={state.createOrUpdateType}
        data={state.updateEmployeeData}
      />
    </>
  );
}

export default Table;
