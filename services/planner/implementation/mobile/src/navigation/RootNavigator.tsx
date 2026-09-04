import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import RecordMemo from "../screens/RecordMemo";
import RoutineWeekScreen from "../screens/RoutineWeekScreen";
import ScheduleWizard from "../screens/ScheduleWizard";
import TabNavigator from "./TabNavigator";

export type RootStackParams = {
  Tabs: undefined;
  RecordMemo: { eventTitle?: string; eventId?: string } | undefined;
  ScheduleWizard: undefined;
  RoutineWeek: undefined;
};

const Stack = createNativeStackNavigator<RootStackParams>();

export default function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Tabs" component={TabNavigator} options={{ headerShown: false }} />
        <Stack.Screen
          name="RecordMemo"
          component={RecordMemo}
          options={{ presentation: "modal", title: "Record Memo" }}
        />
        <Stack.Screen
          name="ScheduleWizard"
          component={ScheduleWizard}
          options={{ presentation: "modal", title: "Set Up Schedule" }}
        />
        <Stack.Screen
          name="RoutineWeek"
          component={RoutineWeekScreen}
          options={{ presentation: "modal", title: "Weekly Routine" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
