import React, { FC, useState, useContext, useEffect } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, StyleSheet, View, Image, Dimensions } from "react-native"
import { AppBottomTabScreenProps  } from "app/navigators"
import { Screen, Text } from "app/components"
import { useAuth0 } from "react-native-auth0"
import { Menu } from "react-native-paper"
import { SafeAreaView } from "react-native-safe-area-context"
import Ionicons from "react-native-vector-icons/Ionicons"
import { useAuth0ProfileData } from "app/lib/hooks/useAuth0ProfileData" 
import { AuthContext } from "app/context/AuthContext"
import { Profile } from 'types/profile';
import SadFaceLogo from "assets/images/sad-face.png"; 



interface ProfileScreenProps extends AppBottomTabScreenProps<"Profile"> {}

export const ProfileScreen: FC<ProfileScreenProps> = observer(function ProfileScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  // Pull in navigation via hook
  // const navigation = useNavigation()
  const { accessToken } = useContext(AuthContext);
  const { clearSession, user } = useAuth0();

  const [isMenuVisible, setMenuVisible] = useState(false);
  const [ hasPicture, setHasPicture] = useState(false);
  const [ hasName, setHasName ] = useState(false);
  const [ hasNickname, setHasNickname ] = useState(false);

  //const profileData: Profile = useAuth0ProfileData(accessToken);


  useEffect(() => {
      if (!user) {
          setHasPicture(false);
          setHasName(false);
      } else {
          setHasPicture(user.picture && user.picture.length > 0 ? true : false);
          setHasName(user.name && user.name.length > 0 ? true : false);
          setHasNickname(user.nickname && user.nickname.length > 0 ? true : false);
      }
  }, [user]);


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
    //const fetchTestMessage = async () => {
    //
    //    //const { getCredentials } = useAuth0();
    //
    //    //get JWT access token
    //    const credentials : Credentials | undefined = await getCredentials();
    //    console.log("Credentials:", credentials);
    //    const options = {
    //        method: 'GET',
    //        url : 'http://localhost:8080/api/private/myDetails',
    //        headers: {
    //            Authorization: `Bearer ${credentials?.accessToken}`
    //        }
    //    };
    //    return axios.request(options)//.then((response: AxiosResponse) => response.data).catch((error) => { console.log(error); });
    //};


    
    //const displayText = async () => {
    //    try {
    //        const response = await fetchTestMessage()
    //        console.log("Response:", response.data);
    //        return <Text text={response.data} />;
    //    } catch (e) {
    //        console.log("Error:", e);
    //        return <Text text="Error" />;
    //    }
    //}


  const imageSource = user && hasPicture ? { uri: user.picture } : SadFaceLogo;
  const displayName = user && hasNickname ? user.nickname : user && hasName ? user.name : "User";

  console.log("id", user?.sub);
  return user && (
    <Screen style={$root} preset="fixed">
    
        <SafeAreaView style={styles.header}>
            <Menu 
                visible={isMenuVisible}
                onDismiss={closeMenu}
                style={styles.menu}
                anchor={
                    <Ionicons name="menu" style={styles.menuTrigger} onPress={openMenu} />
                }>
                <Menu.Item style={styles.menuItem} onPress={() => logout()} title="Logout" />
            </Menu>
        </SafeAreaView>
        <View style={styles.userDataDisplayContainer}>
            <Image source={imageSource} style={styles.profilePicture}/>
            <Text text={displayName} style={styles.displayName} />
        </View>
    </Screen>
  )
})


const $root: ViewStyle = {
  flex: 1,
}

const profileImageWidth = Dimensions.get("window").width * 0.2;
const profileImageHeight = Dimensions.get("window").height * 0.09;
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
        alignItems: "center",
        paddingTop: 5,
        paddingRight: 10,
        height: Dimensions.get("window").height * 0.13,
    },
    menu: {

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
    userDataDisplayContainer: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        paddingLeft: 20,
    },
    profilePicture: {
        width: profileImageWidth,
        height: profileImageHeight,
        borderRadius: profileImageWidth / 2,

    },
    displayName: {
        fontSize: 18,
        color: "black",
        marginTop: 10,
        marginLeft: 10
    },
});



