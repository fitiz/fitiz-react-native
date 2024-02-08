import React from "react"
import { ActivityIndicator, RefreshControl, ScrollView, StyleSheet, View } from "react-native"
import { Text } from "app/components/Text"
import LeaderboardHeader from "app/components/LeaderboardHeader"
import { Card } from "app/components/Card"
import { ListView } from "app/components/ListView"
import { spacing } from "app/theme"
import { LeaderboardUser } from "app/services/api"
import { EmptyState } from "app/components/EmptyState"
import { useStores } from "app/models"
import { delay } from "app/utils/delay"

interface LeaderboardViewProps {
  leaderboard: any;
}

const LeaderboardView = (props: LeaderboardViewProps) => {
  const { leaderboard } = props
  const { challengeStore, participantStore } = useStores()
  const [isLoading, setIsLoading] = React.useState(false)
  const [isRefreshing, setIsRefreshing] = React.useState(false)

  async function onRefresh() {
    setIsRefreshing(true)
    await challengeStore.refreshLeaderboard(participantStore.participant?.userId ?? "")
    setIsRefreshing(false)
  }

  async function participateInChallenge() {
    setIsLoading(true)
    await delay(1000)
    if (participantStore.participant === null) {
      await participantStore.createParticipant()
    }
    await delay(1000)
    await challengeStore.participateInChallenge(participantStore.participant?.userId ?? "")
      .then(() => setIsLoading(false))
  }

  return (
    <>
      <LeaderboardHeader leaderboard={leaderboard} />
      {leaderboard === null ? (isLoading ? (
          <ActivityIndicator />
        ) : (
          <EmptyState
            preset="generic"
            style={{ ...styles.emptyState, ...styles.contentContainer }}
            headingTx={"challengeScreen.noParticipatedLeaderboardEmptyState.heading"}
            contentTx={"challengeScreen.noParticipatedLeaderboardEmptyState.content"}
            buttonTx={"challengeScreen.noParticipatedLeaderboardEmptyState.button"}
            buttonOnPress={participateInChallenge}
            imageSource={require("../../assets/images/dog-walking.png")}
            imageStyle={styles.emptyState}
            ImageProps={{ resizeMode: "contain" }}
          />
        )
      ) : (
        <ScrollView refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
        }>
          {/* eslint-disable-next-line react-native/no-inline-styles */}
          <View style={{ minHeight: 2 }}>
            <ListView<LeaderboardUser>
              contentContainerStyle={styles.listContentContainer}
              data={leaderboard?.participants ?? []}
              extraData={leaderboard?.participants.length ?? 0}
              estimatedItemSize={10}
              renderItem={({ item }) => (
                <Card
                  /* eslint-disable-next-line react-native/no-color-literals,react-native/no-inline-styles */
                  style={participantStore.participant?.username === item.username ? {
                    ...styles.item,
                    backgroundColor: "#baff56",
                  } : styles.item}
                  verticalAlignment="force-footer-bottom"
                  LeftComponent={
                    <Text weight={"bold"} preset={"subheading"}>
                      {item.rank}
                    </Text>}
                  RightComponent={
                    <Text weight={"bold"} preset={"subheading"}>
                      {item.steps}
                    </Text>
                  }
                  ContentComponent={
                    <Text text={item.username} preset={"subheading"} />
                  }
                >
                </Card>
              )}
            />
          </View>
        </ScrollView>
      )
      }
    </>
  )
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingBottom: spacing.lg,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg + spacing.xl,
  },
  emptyState: {
    height: 250,
    marginTop: -20,
  },
  item: {
    marginTop: spacing.md,
    minHeight: 50,
    padding: spacing.md,
  },
  listContentContainer: {
    paddingBottom: spacing.lg,
    paddingHorizontal: spacing.lg,
  },
})

export default LeaderboardView