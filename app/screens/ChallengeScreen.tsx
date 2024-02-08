import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { ActivityIndicator, ImageStyle, ViewStyle } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { EmptyState, Header, Screen, Text } from "app/components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"
import { useStores } from "app/models"
import { spacing } from "app/theme"
import { delay } from "app/utils/delay"
import ChallengeHeader from "app/components/ChallengeHeader"
import LeaderboardView from "app/components/LeaderboardView"
import { Client, StompSubscription } from "@stomp/stompjs"
import LeaderboardHeader from "app/components/LeaderboardHeader"
import 'text-encoding-polyfill'
import { LeaderboardModel } from "app/models/Leaderboard"

interface ChallengesScreenProps extends AppStackScreenProps<"Challenge"> {
}

export const parseJsonToLeaderboard = (json: any) => {
  return LeaderboardModel.create({
    participants: json.participants,
    lastUpdatedTimeMs: json.lastUpdatedTimeMs,
  });
};

export const ChallengeScreen: FC<ChallengesScreenProps> = observer(function ChallengesScreen() {
  const { challengeStore } = useStores()

  const [isLoading, setIsLoading] = React.useState(false)
  const [message, setMessage] = React.useState("")
  const [stompSubscription, setStompSubscription] = React.useState<StompSubscription>(null as unknown as StompSubscription)

  const client = new Client({
    brokerURL: "ws://localhost:8085/challenge",
    onConnect: () => {
      const newStompSubscription = client.subscribe("/leaderboard/challenge-3802d452-2b3b-49a7-96df-5816653bb5e1",
        message => {
          const parsedJson = JSON.parse(message.body)
          challengeStore.setLeaderboard(parseJsonToLeaderboard(parsedJson))
        },
      )
      setStompSubscription(newStompSubscription)
      console.log("Client connected")
    },
    onDisconnect: () => {
      setMessage("")
      console.log("Client disconnected")
    },
    onStompError: frame => {
      console.log(`Broker reported error: ${frame.headers.message}`)
      console.log(`Additional details: ${frame.body}`)
    },
    onWebSocketError: event => {
      console.log("WS error", event)
    }
  })



  async function fetchChallenge() {
    setIsLoading(true)
    await delay(1000)
    await challengeStore.fetchChallenge()
    setIsLoading(false)
  }

  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <Screen
      preset="fixed"
      contentContainerStyle={$screenContentContainer}
    >
      {/* eslint-disable-next-line react-native/no-inline-styles */}
      <Header titleTx={"challengeScreen.title"} />
      {
        challengeStore.challenge ? (
          <>
            <Text text={message} />
            <ChallengeHeader challenge={challengeStore.challenge} />
            <LeaderboardHeader client={client} stompSubscription={stompSubscription} />
            <LeaderboardView leaderboard={challengeStore.leaderboard} />
          </>
        ) : isLoading ? (<ActivityIndicator></ActivityIndicator>) : (
          <EmptyState
            preset="generic"
            style={{ ...$emptyState, ...$contentContainer }}
            headingTx={"challengeScreen.noFoundChallengeEmptyState.heading"}
            contentTx={"challengeScreen.noFoundChallengeEmptyState.content"}
            buttonTx={"challengeScreen.noFoundChallengeEmptyState.button"}
            imageSource={require("../../assets/images/around-world.png")}
            buttonOnPress={fetchChallenge}
            imageStyle={$emptyStateImage}
            ImageProps={{ resizeMode: "contain" }}
          />
        )
      }
    </Screen>
  )
})

// #region Styles
const $screenContentContainer: ViewStyle = {
  flex: 1,
}

const $contentContainer: ViewStyle = {
  paddingHorizontal: spacing.lg,
  paddingTop: spacing.lg + spacing.xl,
  paddingBottom: spacing.lg,
}

const $emptyState: ViewStyle = {
  height: 400,
  marginTop: -20,
}

const $emptyStateImage: ImageStyle = {
  height: 400,
  marginTop: -20,
}
// #endregion