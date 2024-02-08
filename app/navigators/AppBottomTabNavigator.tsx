import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';
import { navigationRef } from './navigationUtilities';
import { useColorScheme } from 'react-native';
import { DarkTheme, DefaultTheme } from '@react-navigation/native';
import * as Screens from 'app/screens';
import { colors } from 'app/theme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';


export type AppBottomTabParamList = {
    Home: undefined;
    Challenge: undefined;
    Profile: undefined;
    Explore: undefined;
};

const Tab = createBottomTabNavigator<AppBottomTabParamList>();
//const exitRoutes = Config.exitRoutes;

export type AppBottomTabScreenProps< T extends keyof AppBottomTabParamList> = BottomTabScreenProps<
    AppBottomTabParamList, 
    T
>

const AppBottomTabs = observer(() => {
    return (
            <Tab.Navigator screenOptions={{
                tabBarShowLabel: false,
                tabBarStyle: {
                    backgroundColor: 'white',
                },
                }}>
                <Tab.Screen name="Home" component={Screens.HomeScreen} 
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Ionicons name={focused ? "home-outline" : "home"} color={focused ? "#81b630" : undefined} size={25}/>
                    ),
                    headerShown: false,
                }}/>
                <Tab.Screen name="Challenge" component={Screens.ChallengeScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Ionicons name={focused ? "trophy-outline" : "trophy"} color={focused ? "#81b630" : undefined} size={25}/>
                    ),
                    headerShown: false,
                }}/>
                <Tab.Screen name="Explore" component={Screens.ExploreScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Ionicons name={focused ? "map-outline" : "map"} color={focused ? "#81b630" : undefined} size={25}/>
                    ),
                    headerShown: false,
                }}/>
                <Tab.Screen name="Profile" component={Screens.ProfileScreen} 
                options={{
                    tabBarIcon : ({ focused }) => (
                        <Ionicons name={focused ? "person-outline" : "person"} color={focused ? "#81b630" : undefined} size={25}/>
                    ), 
                    headerShown: false,
                }}/>
            </Tab.Navigator>
    );
})

export interface BottomNavigationProps 
    extends Partial<React.ComponentProps<typeof NavigationContainer>> { }

export const AppBottomTabNavigator = observer(function AppBottomTabNavigator(props: BottomNavigationProps) {
    const colorScheme = useColorScheme()

    //useBackButtonHandler((routeName) => exitRoutes.includes(routeName))

    return (
        <NavigationContainer
            ref={navigationRef}
            theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
            {...props}
        >
            <AppBottomTabs />
        </NavigationContainer>
    )
})
