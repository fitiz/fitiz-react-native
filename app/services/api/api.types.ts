/**
 * These types indicate the shape of the data you expect to receive from your
 * API endpoint, assuming it's a JSON object like we have.
 */
export interface ChallengeResponse {
  id: string
  name: string
  startDate: string
  finishDate: string
  locationId: number
}

export interface ParticipantCreateRequest {
  userId: string
  username: string
  locationId: number
}

export interface ParticipantResponse {
  userId: string
  username: string
  locationId: number
  points: number
}

export interface LeaderboardUser {
  username: string
  rank: number
  steps: number
}

export interface LeaderboardResponse {
  participants: LeaderboardUser[]
}

export interface ChallengeParticipationRequest {
  challengeId: string
  userId: string
}

export interface ClaimRewardRequest {
  challengeId: string
  userId: string
}

/**
 * The options used to configure apisauce.
 */
export interface ApiConfig {
  /**
   * The URL of the api.
   */
  url: string

  /**
   * Milliseconds before we timeout the request.
   */
  timeout: number
}
