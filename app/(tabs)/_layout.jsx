import { Tabs } from "expo-router";
import React from "react";

const TabsLayout = () => {
    return (
        <Tabs>
            <Tabs.Screen
                name="index"
                options={{
                    headerTitle: "Home",
                    headerStyle: { backgroundColor: "#478CCF" },
                }}
            />
            <Tabs.Screen
                name="employee"
                options={{
                    headerTitle: "Employee",
                    title: "Employee",
                    headerStyle: { backgroundColor: "#478CCF" },
                }}
            />
        </Tabs>
    );
};

export default TabsLayout;
