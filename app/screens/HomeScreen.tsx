import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { AppBottomTabScreenProps } from "app/navigators"
import { Screen, Text } from "app/components"

interface HomeScreenProps extends AppBottomTabScreenProps<"Home"> {}

export const HomeScreen: FC<HomeScreenProps> = observer(function HomeScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <Screen style={$root} preset="scroll">
      <Text text="home" />
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
}
