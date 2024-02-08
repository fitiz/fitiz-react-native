import {
  ApiResponse,
} from "apisauce"
import { ChallengeParticipationRequest, ChallengeResponse, LeaderboardResponse } from "./api.types"
import { GeneralApiProblem, getGeneralApiProblem } from "app/services/api/apiProblem"
import { ChallengeModel, ChallengeSnapshotIn } from "app/models/Challenge"
import { Api } from "app/services/api/api"
import { LeaderboardModel, LeaderboardSnapshotIn } from "app/models/Leaderboard"

export class ChallengeApi extends Api {

  async getChallengeByLocationId(locationId: number): Promise<{
    kind: "ok";
    challenge: ChallengeSnapshotIn
  } | GeneralApiProblem> {
    const response: ApiResponse<ChallengeResponse> = await this.apisauce.get(
      `http://localhost:8080/api/challenges/locations/${locationId}`,
    )

    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    try {
      const rawData = response.data
      const challenge = ChallengeModel.create(rawData)

      return { kind: "ok", challenge }
    } catch (e) {
      if (__DEV__ && e instanceof Error) {
        console.error(`Bad data: ${e.message}\n${response.data}`, e.stack)
      }
      return { kind: "bad-data" }
    }
  }

  async participateInChallenge(request: ChallengeParticipationRequest): Promise<{
    kind: "ok";
    leaderboard: LeaderboardSnapshotIn
  } | GeneralApiProblem> {
    const response: ApiResponse<LeaderboardResponse> = await this.apisauce.post(
      `http://localhost:8080/api/challenges/${request.challengeId}/participants/${request.userId}`, request,
    )

    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    try {
      const rawData = response.data
      const leaderboard = LeaderboardModel.create(rawData)

      return { kind: "ok", leaderboard }
    } catch (e) {
      if (__DEV__ && e instanceof Error) {
        console.error(`Bad data: ${e.message}\n${response.data}`, e.stack)
      }
      return { kind: "bad-data" }
    }
  }

  async getLeaderboard(userId: string): Promise<{
    kind: "ok";
    leaderboard: LeaderboardSnapshotIn
  } | GeneralApiProblem> {
    console.log("userId", userId)
    const response: ApiResponse<LeaderboardResponse> = await this.apisauce.get(
      `http://localhost:8080/api/challenges/participants/${userId}/leaderboards`
    )

    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    try {
      const rawData = response.data
      console.log("rawData", rawData)
      const leaderboard = LeaderboardModel.create(rawData)

      return { kind: "ok", leaderboard }
    } catch (e) {
      if (__DEV__ && e instanceof Error) {
        console.error(`Bad data: ${e.message}\n${response.data}`, e.stack)
      }
      return { kind: "bad-data" }
    }
  }
}

// Singleton instance of the API for convenience
export const challengeApi = new ChallengeApi()
