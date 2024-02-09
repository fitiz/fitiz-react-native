import React from "react"
import { ActivityIndicator, RefreshControl, ScrollView, StyleSheet, View } from "react-native"
import { Text } from "app/components/Text"
import { Card } from "app/components/Card"
import { ListView } from "app/components/ListView"
import { spacing } from "app/theme"
import { LeaderboardUser } from "app/services/api"
import { EmptyState } from "app/components/EmptyState"
import { useStores } from "app/models"
import { delay } from "app/utils/delay"
import { Ionicons } from "@expo/vector-icons"
import { ListItem } from "app/components/ListItem"

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

  function formatTimestamp(timestamp: string) {
    const date = new Date(timestamp);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    const milliseconds = String(date.getMilliseconds()).padStart(3, '0');

    return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}:${milliseconds}`;
  }

  return (
    <>
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
              /* eslint-disable-next-line react-native/no-inline-styles */
              ListFooterComponent={<View style={{
                marginTop: spacing.md,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center" }}>
                <Text
                  preset={"formHelper"}
                  text={leaderboard?.lastUpdatedTimeMs === 0 ? "" : formatTimestamp(leaderboard?.lastUpdatedTimeMs)}
                />
              </View>}
              renderItem={({ item }) => (
                <Card
                  /* eslint-disable-next-line react-native/no-color-literals,react-native/no-inline-styles */
                  style={participantStore.participant?.username === item.username ? {
                    ...styles.item,
                    backgroundColor: "#7dfbbd",
                    shadowColor: "#09e056",
                    shadowOffset: { width: 0, height: 0 },
                    shadowOpacity: 0.9,
                    shadowRadius: 6,
                    elevation: 1,
                    borderColor: "#8effc5",

                  } : styles.item}
                  verticalAlignment="force-footer-bottom"
                  LeftComponent={
                    <Text weight={"bold"} preset={"subheading"}>
                      {item.rank}
                    </Text>}
                  RightComponent={
                    <>
                    <Text weight={"bold"} preset={"subheading"}>
                      {item.steps}
                    </Text>
                    <Ionicons  name={participantStore.participant?.username === item.username ?
                      'footsteps': 'footsteps-outline'} color={'black'} style={{marginLeft:10}} size={24} />
                    </>

                  }
                  ContentComponent={
                    <ListItem containerStyle={{marginVertical: -10}} TextProps={{ numberOfLines: 1 }}>
                      <Text text={item.username} preset={"subheading"} />
                    </ListItem>
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
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: spacing.xs,
    minHeight: 50,
    padding: spacing.md,
  },
  listContentContainer: {
    paddingBottom: spacing.lg,
    paddingHorizontal: spacing.lg,
  },
})

export default LeaderboardView