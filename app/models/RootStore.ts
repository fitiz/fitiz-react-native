import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { ChallengeStoreModel } from "app/models/ChallengeStore"
import { ParticipantStoreModel } from "app/models/ParticipantStore"

/**
 * A RootStore model.
 */
export const RootStoreModel = types.model("RootStore").props({
  challengeStore: types.optional(ChallengeStoreModel, {}),
  participantStore: types.optional(ParticipantStoreModel, {}),
})

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}
/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
