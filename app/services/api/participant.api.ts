import {
  ApiResponse,
} from "apisauce"
import { ParticipantCreateRequest, ParticipantResponse } from "./api.types"
import { GeneralApiProblem, getGeneralApiProblem } from "app/services/api/apiProblem"
import { Api } from "app/services/api/api"
import { ParticipantModel, ParticipantSnapshotIn } from "app/models/Participant"

export class ParticipantApi extends Api {

  async createParticipant(request: ParticipantCreateRequest): Promise<{ kind: "ok",
    participant: ParticipantSnapshotIn } | GeneralApiProblem> {
    const response: ApiResponse<ParticipantResponse> = await this.apisauce.post(
      `http://localhost:8080/api/participants`, request
    )

    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    try {
      const rawData = response.data
      const participant = ParticipantModel.create(rawData)

      return { kind: "ok", participant }
    } catch (e) {
      if (__DEV__ && e instanceof Error) {
        console.error(`Bad data: ${e.message}\n${response.data}`, e.stack)
      }
      return { kind: "bad-data" }
    }
  }
}

// Singleton instance of the API for convenience
export const participantApi = new ParticipantApi()
