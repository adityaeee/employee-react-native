import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
    createEmployee,
    updateEmployee,
} from "../redux/features/employeeSlice";
import { router } from "expo-router";

const EmployeeForm = ({ employeeId }) => {
    const dispatch = useDispatch();
    const employee = useSelector((state) =>
        state.employee.employees.find((emp) => emp.id === employeeId)
    );

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [position, setPosition] = useState("");
    const [salary, setSalary] = useState("");

    useEffect(() => {
        if (employee) {
            setFullName(employee.fullName);
            setEmail(employee.email);
            setPhoneNumber(employee.phoneNumber);
            setPosition(employee.position);
            setSalary(employee.salary);
        }
    }, [employee, dispatch]);

    const handleSubmit = () => {
        const formData = new FormData();

        const employeeData = {
            id: employeeId,
            fullName,
            email,
            phoneNumber,
            hireDate: new Date().toISOString(),
            position,
            salary: parseFloat(salary),
            status: true,
            imageResponse: employee
                ? employee.imageResponse
                : { url: "/api/v1/image/default", name: "default.png" },
        };

        formData.append("employee", JSON.stringify(employeeData));

        if (employeeId) {
            dispatch(updateEmployee(formData));
        } else {
            dispatch(createEmployee(formData));
        }

        router.back();
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Full Name:</Text>
            <TextInput
                style={styles.input}
                value={fullName}
                onChangeText={setFullName}
            />

            <Text style={styles.label}>Email:</Text>
            <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
            />

            <Text style={styles.label}>Phone Number:</Text>
            <TextInput
                style={styles.input}
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                keyboardType="phone-pad"
            />

            <Text style={styles.label}>Position:</Text>
            <TextInput
                style={styles.input}
                value={position}
                onChangeText={setPosition}
            />

            <Text style={styles.label}>Salary:</Text>
            <TextInput
                style={styles.input}
                value={salary}
                onChangeText={setSalary}
                keyboardType="numeric"
            />

            <Button
                title={employeeId ? "Update Employee" : "Add Employee"}
                onPress={handleSubmit}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "#fff",
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ddd",
        padding: 8,
        borderRadius: 4,
        marginBottom: 16,
    },
});

export default EmployeeForm;
