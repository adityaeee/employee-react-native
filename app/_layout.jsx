import { Stack } from "expo-router";
import { Provider } from "react-redux";
import { store } from "../redux/store";

export default function Layout() {
    return (
        <Provider store={store}>
            <Stack>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen
                    name="employees/add-employee"
                    options={{ title: "Tambah Karyawan" }}
                />
                <Stack.Screen
                    name="employees/[employeeId]"
                    options={{ title: "Perbarui Karyawan" }}
                />
            </Stack>
        </Provider>
    );
}
