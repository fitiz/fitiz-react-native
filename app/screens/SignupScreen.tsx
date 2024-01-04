import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { AppStackScreenProps} from "app/navigators"
import { Screen } from "app/components"
import { SafeAreaView } from "react-native-safe-area-context"
import { useAuth0 } from "react-native-auth0";
import { Button } from "react-native";


interface SignupScreenProps extends AppStackScreenProps<"Signup"> {}

export const SignupScreen: FC<SignupScreenProps> = observer(function SignupScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  

  const SignInButton = () => {
      const { authorize } = useAuth0();
        
      const signIn = async () => {
          try {
              await authorize();
          } catch (e) {
              console.log("Sign In error:",e);
          }
      };

      return <Button title="Sign In" onPress={signIn} />;
  }


  return (
    <Screen style={$root} preset="scroll">
        <SafeAreaView>
            <SignInButton />
        </SafeAreaView>
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
}
