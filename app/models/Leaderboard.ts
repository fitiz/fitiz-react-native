import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"

const leaderboardUserModel = types.model({
  username: types.string,
  rank: types.number,
  steps: types.number,
})

export const LeaderboardModel = types
  .model("Leaderboard", {
      participants: types.array(leaderboardUserModel),
      lastUpdatedTimeMs: 0,
    },
  )
  .props({
    participants: types.array(leaderboardUserModel),
    lastUpdatedTimeMs: 0,
  })
  .actions(withSetPropAction)
  .views((store) => ({
    setParticipants(participants: any) {
      store.participants = participants;
    },
    setLastUpdatedTimeMs(time: number) {
      store.lastUpdatedTimeMs = time;
    },
  }))

export interface Leaderboard extends Instance<typeof LeaderboardModel> {
}

export interface LeaderboardSnapshotOut extends SnapshotOut<typeof LeaderboardModel> {
}

export interface LeaderboardSnapshotIn extends SnapshotIn<typeof LeaderboardModel> {
}
