import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { participantApi } from "../services/api"
import { withSetPropAction } from "./helpers/withSetPropAction"
import { ParticipantModel } from "app/models/Participant"
import { LOCATION_ID, USER_ID, USERNAME } from "app/services/api/random"


export const ParticipantStoreModel = types
  .model("ParticipantStore")
  .props({
    participant: types.maybeNull(ParticipantModel),
  })
  .actions(withSetPropAction)
  .actions((store) => ({
    async createParticipant() {
      const response = await participantApi.createParticipant({
        userId: USER_ID,
        username: USERNAME,
        locationId: LOCATION_ID,
      })
      if (response.kind === "ok") {
        store.setProp("participant", response.participant)
      } else {
        console.error(`Error creating participant: ${JSON.stringify(response)}`)
      }
    },
    participateInChallenge() {
      // api call to participate in challenge
    }
  }))
  .views(() => ({
  }))
  .actions(() => ({
  }))

export interface ParticipantStore extends Instance<typeof ParticipantStoreModel> {}
export interface ParticipantStoreSnapshot extends SnapshotOut<typeof ParticipantStoreModel> {}
