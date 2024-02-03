import React, { FC, useState, useEffect, useContext } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, View} from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { Screen, Text } from "app/components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"
import { SafeAreaView } from "react-native-safe-area-context"
import ApiService from "app/lib/ApiService"
import { AuthContext } from "app/context/AuthContext"

interface ChallengesScreenProps extends AppStackScreenProps<"Challenges"> {}

export const ChallengesScreen: FC<ChallengesScreenProps> = observer(function ChallengesScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  const [testMessage, setTestMessage] = useState("")
  const { accessToken } = useContext(AuthContext)


    const fetchTestMessage = async () => {
        try { 
           const response = await ApiService.testMessage(accessToken || "")
           setTestMessage(response.message)
        } catch (error) {
            console.log(error)
        }
    }

   useEffect(() => {
       fetchTestMessage()
   }, [])
       
  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <Screen style={$root} preset="scroll">
        <SafeAreaView>
            <Text text="challenges" />
        </SafeAreaView>
        <View>
            <Text text={testMessage} />
        </View>
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
}
