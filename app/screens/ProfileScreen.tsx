import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
//import { AppScreenProps } from "app/navigators"
import { AppBottomTabScreenProps  } from "app/navigators"
import { Button, Screen, Text } from "app/components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"
import { useAuth0 } from "react-native-auth0"
import { useState } from "react"


interface ProfileScreenProps extends AppBottomTabScreenProps<"Profile"> {}

type Credentials = {
    accessToken: string;
    expiresAt: number;
    idToken: string;
    refreshToken?: string;
    scope?: string;
    tokenType: string;
    [key: string]: any;
}
export const ProfileScreen: FC<ProfileScreenProps> = observer(function ProfileScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  // Pull in navigation via hook
  // const navigation = useNavigation()
  const {  clearSession, user, getCredentials } = useAuth0();
  const [credentials, setCredentials] = useState<Credentials | null> (null);

  const logout = async  () => {
    try {
        await clearSession();
    } catch (e) {
        console.log("Logout error:", e);
    }

 };

    const callGetCredentials = async () => {
        try {
            const newCredentials = await getCredentials();
            setCredentials(newCredentials);
        } catch (e) {
            console.log("Error:", e);
        }
    };

    //callGetCredentials();

  return (
    <Screen style={$root} preset="scroll">
      <Text text="profile" />
      {user && <Button text="logout" onPress={logout} />}
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
}
