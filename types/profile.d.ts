export type Profile = {
    address?: string;
    birthdate?: string;
    email?: string;
    emailVerified?: boolean;
    familyName?: string;
    gender?: string;
    givenName?: string;
    locale?: string;
    middleName?: string;
    name?: string;
    nickname?: string;
    phoneNumber?: string;
    phoneNumberVerified?: boolean;
    picture?: string;
    preferredUsername?: string;
    profile?: string;
    sub?: string;
    updatedAt?: string;
    website?: string;
    zoneinfo?: string;
    [key: string]: any;
}

export type APIResponse = {
    results: Profile[];
}
