import React from "react"
import { StyleSheet, Switch, View } from "react-native"
import { Text } from "app/components/Text"
import { Tooltip } from "react-native-paper"
import { Client, StompSubscription } from "@stomp/stompjs"
import LiveIcon from "app/components/LiveIcon"
import "text-encoding-polyfill"
import { useStores } from "app/models"

interface LeaderboardHeaderProps {
  client: Client;
  stompSubscription: StompSubscription;
}

const LeaderboardHeader = (props: LeaderboardHeaderProps) => {
  const { client, stompSubscription } = props
  const { challengeStore } = useStores()

  const [isEnabled, setIsEnabled] = React.useState(false)

  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState)

    if (isEnabled) {
      console.log("Unsubscribing from leaderboard updates", stompSubscription)
      if (stompSubscription) {
        stompSubscription.unsubscribe()
      }
      client.deactivate({ force: true }).then(() => {
        console.log("Client deactivated")
      }).catch((err) => {
        console.log("Error deactivating client", err)
      }).finally(() => {
        console.log("Client deactivation complete")
      })
    } else {
      client.activate()
    }
  }

  return (
    <View style={styles.headerContainer}>
      {/* eslint-disable-next-line react-native/no-inline-styles */}
      <Text preset={"subheading"} weight={"bold"} style={{ flex: 1 }} tx={"challengeScreen.leaderboard"} />
      {/* eslint-disable-next-line react-native/no-inline-styles */}
      <Tooltip leaveTouchDelay={500} title={"Enable for live updates on the leaderboard!"}>
        {/* eslint-disable-next-line react-native/no-inline-styles */}
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          {challengeStore.leaderboard !== null ? (<>
            {isEnabled ? <LiveIcon /> : <></>}
            <Text preset={"formLabel"} text={" Live Mode  "} />
            <Switch
              trackColor={{ false: "#767577", true: "#4ade80" }}
              thumbColor={isEnabled ? "#f4f3f4" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </>) : <></>}
        </View>
      </Tooltip>
    </View>
  )
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    marginTop: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
})

export default LeaderboardHeader