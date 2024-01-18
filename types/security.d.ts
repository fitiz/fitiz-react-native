export type Credentials = {
    accessToken: string;
    expiresAt: number;
    idToken: string;
    refreshToken?: string;
    scope?: string;
    tokenType: string;
    [key: string]: any;
}
