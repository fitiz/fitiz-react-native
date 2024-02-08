import React, { FC, useState, useContext } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, View, Button} from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { Screen, Text } from "app/components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"
import { SafeAreaView } from "react-native-safe-area-context"
import ApiService from "app/services/ApiService"
import { AuthContext } from "app/context/AuthContext"

interface ChallengesScreenProps extends AppStackScreenProps<"Challenges"> {}

export const ChallengesScreen: FC<ChallengesScreenProps> = observer(function ChallengesScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  const [testMessage, setTestMessage] = useState("empty")
  const { accessToken } = useContext(AuthContext)


    const fetchTestMessage = async () => {
        try { 
           const response =  await ApiService.testMessage(accessToken)
           setTestMessage(response || "empty")
        } catch (error) {
            console.log(error)
        }
    }

       
  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <Screen style={$root} preset="scroll">
        <SafeAreaView>
            <Text text="challenges" />
        </SafeAreaView>
        <View>
            <Button title="fetch test message" onPress={fetchTestMessage} />
            <Text text={testMessage} />
        </View>
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
}
