import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle} from "react-native"
import { AppBottomTabScreenProps } from "app/navigators"
import { Screen} from "app/components"
import { SafeAreaView } from "react-native-safe-area-context"
import { useMetrics } from "app/context/MetricsContext"
import { FitnessMetrics } from "app/components/FitnessMetrics"

interface HomeScreenProps extends AppBottomTabScreenProps<"Home"> {}

export const HomeScreen: FC<HomeScreenProps> = observer(function HomeScreen() {
 const { userFitnessMetrics } = useMetrics();


 return (
    <Screen style={$root} preset="scroll">
        <SafeAreaView>
        </SafeAreaView>
        <FitnessMetrics
            steps={userFitnessMetrics.stepCount || 0} 
            goal={10000}
            calories={100}
            distance={userFitnessMetrics.distanceTotal || 0}
        />
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
}
