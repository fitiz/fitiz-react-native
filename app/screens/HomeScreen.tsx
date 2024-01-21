import React, { FC, useState, useEffect } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, View } from "react-native"
import { AppBottomTabScreenProps } from "app/navigators"
import { Screen, Text } from "app/components"
import { SafeAreaView } from "react-native-safe-area-context"
import { Pedometer } from "expo-sensors"


interface HomeScreenProps extends AppBottomTabScreenProps<"Home"> {}

export const HomeScreen: FC<HomeScreenProps> = observer(function HomeScreen() {
    const [isPedometerAvailable, setIsPedometerAvailable] = useState('checking');
    const [pastStepCount, setPastStepCount] = useState(0);
    const [currentStepCount, setCurrentStepCount] = useState(0);

    const subscribe = async () => {
        const isAvailable = await Pedometer.isAvailableAsync();
        setIsPedometerAvailable(String(isAvailable));

        if (isAvailable) {
            //check for permissions
            const hasPermissions = await requestPermissions();
            const end = new Date();
            const start = new Date();
            start.setDate(end.getDate() - 1);

            const pastStepCountResult = await Pedometer.getStepCountAsync(start, end);
            if (pastStepCountResult) {
                setPastStepCount(pastStepCountResult.steps);
            }


            return Pedometer.watchStepCount((result) => {
                setCurrentStepCount(result.steps);
            });
        } 
    }


    useEffect(() => {
        const subscription = subscribe();
        return () => {
            subscription 
        }
    }, []);


  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <Screen style={$root} preset="scroll">
        <SafeAreaView>
            <Text text="home" />
        </SafeAreaView>
        <View>
            <Text>Pedometer available: {isPedometerAvailable}</Text>
            <Text>Steps taken in the last 24 hours: {pastStepCount}</Text>
            <Text>Walk! And watch this go up: {currentStepCount}</Text>
        </View>
    </Screen>
  )
})


const requestPermissions = async () => {
    let permissions = await Pedometer.getPermissionsAsync();
    if (permissions.granted) {
        return true;
    }
    if(!permissions.granted){
        permissions = await Pedometer.requestPermissionsAsync();
    }
    return permissions.granted;
}

const $root: ViewStyle = {
  flex: 1,
}
