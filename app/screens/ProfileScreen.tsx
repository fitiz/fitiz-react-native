import React, { FC, useState } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, StyleSheet } from "react-native"
import { AppBottomTabScreenProps  } from "app/navigators"
import { Button, Screen, Text } from "app/components"
import { useAuth0 } from "react-native-auth0"
import { Menu } from "react-native-paper"
import { SafeAreaView } from "react-native-safe-area-context"
import Ionicons from "react-native-vector-icons/Ionicons"
import axios, { AxiosResponse } from "axios"

interface ProfileScreenProps extends AppBottomTabScreenProps<"Profile"> {}

export const ProfileScreen: FC<ProfileScreenProps> = observer(function ProfileScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  // Pull in navigation via hook
  // const navigation = useNavigation()
  const {  clearSession, getCredentials, user } = useAuth0();
  const [isMenuVisible, setMenuVisible] = useState(false);

  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  const logout = async  () => {
    try {
        await clearSession();
    } catch (e) {
        console.log("Logout error:", e);
    }

 };
    //testing jwt access token
    const fetchTestMessage = async () => {
    
        //const { getCredentials } = useAuth0();
    
        //get JWT access token
        const credentials : Credentials | undefined = await getCredentials();
        console.log("Credentials:", credentials);
        const options = {
            method: 'GET',
            url : 'http://localhost:8080/api/private/myDetails',
            headers: {
                Authorization: `Bearer ${credentials?.accessToken}`
            }
        };
        return axios.request(options)//.then((response: AxiosResponse) => response.data).catch((error) => { console.log(error); });
    };


    
    const displayText = async () => {
        try {
            const response = await fetchTestMessage()
            console.log("Response:", response.data);
            return <Text text={response.data} />;
        } catch (e) {
            console.log("Error:", e);
            return <Text text="Error" />;
        }
    }

  return user && (
    <Screen style={$root} preset="fixed">
    
        <SafeAreaView style={styles.header}>
            <Menu 
                visible={isMenuVisible}
                onDismiss={closeMenu}
                style={styles.menu}
                anchor={
                    <Ionicons name="menu-outline" style={styles.menuTrigger} onPress={openMenu} />
                }>
                <Menu.Item style={styles.menuItem} onPress={() => logout()} title="Logout" />
            </Menu>
        </SafeAreaView>
        <Button text="get Credentials" onPress={displayText} />
    </Screen>
  )
})



const $root: ViewStyle = {
  flex: 1,
}

const styles = StyleSheet.create({
    logoutButton: {
        backgroundColor: "black",
        width: 100,

    },
    logoutButtonText: {
        color: "white",
    },
    header: {
        flexDirection: "row",
        justifyContent: "flex-end",
        paddingRight: 16,
    },
    menu: {
        marginTop: 20,
    },
    menuTrigger: {
        fontSize: 24,
        color: "black",
        lineHeight: 20,
    },
    menuItem: {
        color: "blue",
        borderRadius: 100,
    },
});
