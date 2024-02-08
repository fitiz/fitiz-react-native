import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"
import { formatDate } from "../utils/formatDate"

export const ChallengeModel = types
  .model("Challenge")
  .props({
    id: types.identifier,
    name: "",
    startDate: "", // Ex: 2022-08-12 21:05:36
    finishDate: "", // Ex: 2022-09-12 21:05:36
    locationId: types.number,
  })
  .actions(withSetPropAction)
  .views((challenge) => ({
    get parsedName() {
      const defaultValue = { title: challenge.name?.trim()}
      return { title: defaultValue }
    },
    get formattedDates() {
      try {
        const formattedStartDate = formatDate(challenge.startDate)
        const formattedEndDate = formatDate(challenge.finishDate)
        return {
          startDate: formattedStartDate,
          finishDate: formattedEndDate,
        }
      } catch (error) {
        return { startDate: "", finishDate: "" }
      }
    },
  }))

export interface Challenge extends Instance<typeof ChallengeModel> {}
export interface ChallengeSnapshotOut extends SnapshotOut<typeof ChallengeModel> {}
export interface ChallengeSnapshotIn extends SnapshotIn<typeof ChallengeModel> {}
