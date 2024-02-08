import { detach, flow, Instance, SnapshotOut, types } from "mobx-state-tree"
import { challengeApi } from "../services/api"
import { ChallengeModel } from "./Challenge"
import { withSetPropAction } from "./helpers/withSetPropAction"
import { LeaderboardModel } from "app/models/Leaderboard"
import { LOCATION_ID } from "app/services/api/random"

export const ChallengeStoreModel = types
  .model("ChallengeStore")
  .props({
    challenge: types.maybeNull(ChallengeModel),
    leaderboard: types.maybeNull(LeaderboardModel),
  })
  .actions(withSetPropAction)
  .actions((store) => ({
    fetchChallenge: flow(function* () {
      try {
        const response = yield challengeApi.getChallengeByLocationId(LOCATION_ID);
        if (response.kind === "ok") {
          store.setProp("challenge", response.challenge);
        } else {
          console.error(`Error fetching challenges: ${JSON.stringify(response)}`);
        }
      } catch (error) {
        console.error("Error in fetchChallenge:", error);
      }
    }),
    participateInChallenge: flow(function* (userId: string) {
        const response = yield challengeApi.participateInChallenge({
        challengeId: store.challenge?.id ?? "",
        userId,
      })
      if (response.kind === "ok") {
        store.setProp("leaderboard", response.leaderboard)
        return response.leaderboard
      } else {
        console.error(`Error while participating in challenge : ${JSON.stringify(response)}`)
        return null
      }
    }),
    updateLeaderboard: flow( function*(userId: string) {
      const response = yield challengeApi.getLeaderboard(userId)
      if (response.kind === "ok") {
        return response.leaderboard
      } else {
        console.error(`Error while fetching leaderboard : ${JSON.stringify(response)}`)
        return null
      }
    })
  }))
  .views(() => ({
  }))
  .actions((store) => ({
    refreshLeaderboard: flow(function* (userId: string) {
      try {
        const response = yield challengeApi.getLeaderboard(userId);
        if (response.kind === "ok") {
          const leaderboard = response.leaderboard;
          if (leaderboard) {
            detach(store.leaderboard);
            store.setProp("leaderboard", leaderboard);
          }
        }
      } catch (error) {
        console.error("Error in refreshLeaderboard:", error);
      }
    }),
  }))

export interface ChallengeStore extends Instance<typeof ChallengeStoreModel> {}
export interface ChallengeStoreSnapshot extends SnapshotOut<typeof ChallengeStoreModel> {}
