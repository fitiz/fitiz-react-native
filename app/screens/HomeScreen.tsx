import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { AppBottomTabScreenProps } from "app/navigators"
import { Screen, Text } from "app/components"
import { SafeAreaView } from "react-native-safe-area-context"

interface HomeScreenProps extends AppBottomTabScreenProps<"Home"> {}

export const HomeScreen: FC<HomeScreenProps> = observer(function HomeScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <Screen style={$root} preset="scroll">
        <SafeAreaView>
            <Text text="home" />
        </SafeAreaView>
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
}
