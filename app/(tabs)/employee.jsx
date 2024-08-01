import React, { useEffect } from "react";
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    ActivityIndicator,
    TouchableOpacity,
    Button,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import {
    deleteEmployee,
    fetchEmployees,
} from "../../redux/features/employeeSlice";
import { router } from "expo-router";

const EmployeeList = ({ navigation }) => {
    const { employees, status, error } = useSelector((state) => state.employee);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchEmployees());
    }, [dispatch]);

    const handleUpdateEmployee = (employeeId) => {
        router.push({
            pathname: "employees/[employeeId]",
            params: { employeeId: employeeId },
        });
    };

    const handleDeleteEmployee = (employeeId) => {
        dispatch(deleteEmployee(employeeId));
    };

    const renderItem = ({ item }) => (
        <View style={styles.item}>
            <View style={styles.textContainer}>
                <Text style={styles.name}>{item.fullName}</Text>
                <Text style={styles.email}>{item.email}</Text>
                <Text style={styles.phone}>{item.phoneNumber}</Text>
                <Text style={styles.hireDate}>
                    Hire Date: {new Date(item.hireDate).toDateString()}
                </Text>
                <Text style={styles.position}>Position: {item.position}</Text>
                <Text style={styles.salary}>Salary: {item.salary}</Text>
                <Text style={styles.status}>
                    Status: {item.status ? "Active" : "Inactive"}
                </Text>
            </View>
            <View style={styles.buttonContainer}>
                <Button
                    title="Update"
                    onPress={() => handleUpdateEmployee(item.id)}
                />
                <Button
                    title="Delete"
                    onPress={() => handleDeleteEmployee(item.id)}
                    color="red"
                />
            </View>
        </View>
    );

    if (status === "loading") {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    if (status === "failed") {
        return <Text>Error: {error}</Text>;
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.addButton}
                onPress={() => router.push("/employees/add-employee")}
            >
                <Text style={styles.addButtonText}>Tambah Data Employee</Text>
            </TouchableOpacity>
            <FlatList
                data={employees}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
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
    addButton: {
        backgroundColor: "#4CAF50",
        padding: 10,
        borderRadius: 5,
        alignItems: "center",
        marginBottom: 16,
    },
    addButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    item: {
        flexDirection: "row",
        marginBottom: 16,
        padding: 8,
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 8,
        alignItems: "center",
    },
    image: {
        width: 50,
        height: 50,
        marginRight: 16,
        borderRadius: 25,
    },
    textContainer: {
        justifyContent: "center",
        flex: 1,
    },
    name: {
        fontSize: 16,
        fontWeight: "bold",
    },
    email: {
        fontSize: 14,
    },
    phone: {
        fontSize: 14,
    },
    hireDate: {
        fontSize: 14,
        color: "gray",
    },
    position: {
        fontSize: 14,
    },
    salary: {
        fontSize: 14,
        color: "green",
    },
    status: {
        fontSize: 14,
        color: "blue",
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
});

export default EmployeeList;
