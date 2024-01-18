import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { AppStackScreenProps} from "app/navigators"
import { Screen } from "app/components"
import { SafeAreaView } from "react-native-safe-area-context"
import { useAuth0 } from "react-native-auth0";
import { Button, Image, View, StyleSheet, ViewStyle } from "react-native";
import LogoPrimary from 'assets/images/logoPrimary.png';
import { Dimensions } from 'react-native';

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
              await authorize({ audience: 'https://api.fitiz.com/api'});
          } catch (e) {
              console.log("Sign In error:",e);
          }
      };

      return <Button title="Sign In" onPress={signIn} />;
  }


  return (
    <Screen style={$root} preset="scroll">
        <SafeAreaView>
            <View>
                <Image source={LogoPrimary} style={styles.logoPrimary}/>
            </View>
        </SafeAreaView>
        <SignInButton />
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
  backgroundColor: "#fff",
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const imageHeight = windowHeight * 0.55;
const imageWidth = windowWidth * 1.0;

const styles = StyleSheet.create({
    logoPrimary: {
        width: imageWidth,
        height: imageHeight,    
        alignSelf: 'center',
        marginTop: 100,
        borderRadius: 200,
    },

})
