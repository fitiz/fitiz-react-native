import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { ActivityIndicator, ImageStyle, ViewStyle } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { EmptyState, Header, Screen } from "app/components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"
import { useStores } from "app/models"
import { spacing } from "app/theme"
import { delay } from "app/utils/delay"
import ChallengeHeader from "app/components/ChallengeHeader"
import LeaderboardView from "app/components/LeaderboardView"

interface ChallengesScreenProps extends AppStackScreenProps<"Challenge"> {
}

export const ChallengeScreen: FC<ChallengesScreenProps> = observer(function ChallengesScreen() {
  const { challengeStore } = useStores()

  const [isLoading, setIsLoading] = React.useState(false)

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
            <ChallengeHeader challenge={challengeStore.challenge} />
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