import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";

const initialState = {
    employees: [],
    employee: null,
    status: null,
    error: null,
};

export const fetchEmployees = createAsyncThunk(
    "employee/fetchEmployees",
    async (_, { rejectedWithValue }) => {
        try {
            const response = await axiosInstance.get("/employee");
            console.log("Fetch data employee" + response.data);
            return response.data;
        } catch (error) {
            return rejectedWithValue(error.response.data);
        }
    }
);

export const createEmployee = createAsyncThunk(
    "employee/createEmployee",
    async (employee, { rejectedWithValue }) => {
        try {
            const response = await axiosInstance.post("/employee", employee, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            return response.data;
        } catch (e) {
            return rejectedWithValue(error.response.data);
        }
    }
);

export const updateEmployee = createAsyncThunk(
    "employee/updateEmployee",
    async (employee, { rejectedWithValue }) => {
        try {
            const response = await axiosInstance.put("/employee", employee);
            return response.data;
        } catch (e) {
            return rejectedWithValue(error.response.data);
        }
    }
);

export const deleteEmployee = createAsyncThunk(
    "employee/deleteEmployee",
    async (id, { rejectedWithValue }) => {
        try {
            const response = await axiosInstance.delete(`/employee/${id}`);
            return response.data;
        } catch (e) {
            return rejectedWithValue(error.response.data);
        }
    }
);

const employeeSlice = createSlice({
    name: "employee",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchEmployees.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchEmployees.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.employees = action.payload.data;
            })
            .addCase(fetchEmployees.rejected, (state, action) => {
                state.status = "failed";
                state.employees = action.payload;
            })
            .addCase(createEmployee.fulfilled, (state, action) => {
                (state.status = "succeeded"),
                    state.employees.push(action.payload);
            })
            .addCase(updateEmployee.fulfilled, (state, action) => {
                const index = state.employees.findIndex(
                    (employee) => employee.id === action.payload.id
                );
                if (index !== -1) {
                    state.employees[index] = action.payload;
                }
                state.status = "succeeded";
            })
            .addCase(deleteEmployee.fulfilled, (state, action) => {
                state.employees = state.employees.filter(
                    (emp) => emp.id !== action.meta.arg
                );
                state.status = "succeeded";
            })
            .addMatcher(
                (action) => action.type.endsWith("/rejected"),
                (state, action) => {
                    state.error = action.payload;
                    state.status = "failed";
                }
            );
    },
});

export default employeeSlice.reducer;
