import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { Screen, Text } from "app/components"
import { AppBottomTabScreenProps } from "app/navigators"
import { SafeAreaView } from "react-native-safe-area-context"

interface ExploreScreenProps extends AppBottomTabScreenProps<"Explore"> {}

export const ExploreScreen: FC<ExploreScreenProps> = observer(function ExploreScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

// import { useStores } from "app/models"
  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <Screen style={$root} preset="scroll">
        <SafeAreaView>
            <Text text="explore" />
        </SafeAreaView>
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
}
