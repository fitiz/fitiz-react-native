import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "app/models/helpers/withSetPropAction"

export const ParticipantModel = types
  .model("Participant")
  .props({
    userId: types.identifier,
    username: "",
    locationId: types.number,
    points: types.number,
  })
  .actions(withSetPropAction)
  .views(() => ({
  }))

export interface Participant extends Instance<typeof ParticipantModel> {}
export interface ParticipantSnapshotOut extends SnapshotOut<typeof ParticipantModel> {}
export interface ParticipantSnapshotIn extends SnapshotIn<typeof ParticipantModel> {}
