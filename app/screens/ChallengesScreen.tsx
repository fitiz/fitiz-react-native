import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { Screen, Text } from "app/components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"
import { SafeAreaView } from "react-native-safe-area-context"

interface ChallengesScreenProps extends AppStackScreenProps<"Challenges"> {}

export const ChallengesScreen: FC<ChallengesScreenProps> = observer(function ChallengesScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <Screen style={$root} preset="scroll">
        <SafeAreaView>
            <Text text="challenges" />
        </SafeAreaView>
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
}
