import React from "react";
import EmployeeForm from "../../../components/employeeForm";
import { useLocalSearchParams, useRouter } from "expo-router";

const UpdateEmployee = () => {
    const router = useRouter();
    const { employeeId } = useLocalSearchParams();

    return <EmployeeForm employeeId={employeeId} />;
};

export default UpdateEmployee;
