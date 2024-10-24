import { enableScreens } from 'react-native-screens';
enableScreens();
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { LoginScreen } from './screens/LoginScreen';
import { AlunoInfoScreen } from './screens/AlunoInfoScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="AlunoInfo" component={AlunoInfoScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
