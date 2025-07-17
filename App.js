import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import StackNavigator from "./StackNavigator";
import { UserContext } from "./UserContext";
import { LogBox } from 'react-native';
import registerNNPushToken from 'native-notify';

LogBox.ignoreLogs([
  'Warning: ...', // partial match
  'Require cycle:',
  'AsyncStorage has been extracted',
]);

export default function App() {
  registerNNPushToken(29576, 'C2bSYDuKQOFJKjDJfHEJV9');


  LogBox.ignoreAllLogs(true);
  return (
    <>
      <UserContext>
        <StackNavigator />
      </UserContext>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
