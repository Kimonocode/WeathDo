import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import { RootStackParamList } from '../../types';
import CreateTaskScreen from '../screens/tasks/CreateTask';

const Stack = createNativeStackNavigator<RootStackParamList>();

const Navigation = () => {
    return (
        <NavigationContainer>
        <Stack.Navigator screenOptions={{
             headerShadowVisible:false,
                headerStyle:{
                    backgroundColor:'#181A20',
                }
        }}>
            <Stack.Screen name='Home' component={HomeScreen}  options={{
                title:'',
            }}/>
            <Stack.Screen name='CreateTask' component={CreateTaskScreen}  options={{
                title:'',
            }}/>
        </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigation;