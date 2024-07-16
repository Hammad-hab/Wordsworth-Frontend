import { jsonrepair } from "jsonrepair"
enum FirebaseAuthenticationErrors {
    INVALID_CREDS = "auth/invalid-credential",
    MISSING_PASSW = "auth/missing-password",
    INVALID_EMAIL = "auth/invalid-email",
    TOO_MANY_REQS = "auth/too-many-requests"
}

interface MegaFile {
    name: string,
    size: number
}

interface BookInformationData {
    author_alternative_name: string[],
    author_key: string[],
    author_name: string[],
    cover_edition_key: string,
    cover_i: number,
    edition_key: string[],
    first_sentence: string[],
    subject: string[],
    ratings_average: number
}


type Preferences = "adventure" | 'science-fiction' | "fiction" | "non-fiction" | "historic-fiction" | "fantasy" | "romance" | "young-adult" | "mystery" | "comedy"
type Gender = "M" | "F" | "NA"

interface UserInformation {
    displayName?: string,
    gender?: Gender,
    birthdate?: Date,
    preferences?: string[]
    hobbies?: string[],
    additionalInformation?: string,
    customisedMarkdown?: string[]
    profilePicture?: string | null | undefined,
    isProUser: boolean
    userIsCustomised: boolean,
    userstorageid: string
    storageUsed?: number,
}


function classifyFirebaseAuthError(e: string): FirebaseAuthenticationErrors {
    if (e.includes(FirebaseAuthenticationErrors.INVALID_CREDS)) return FirebaseAuthenticationErrors.INVALID_CREDS
    else if (e.includes(FirebaseAuthenticationErrors.MISSING_PASSW)) return FirebaseAuthenticationErrors.MISSING_PASSW
    else if (e.includes(FirebaseAuthenticationErrors.INVALID_EMAIL)) return FirebaseAuthenticationErrors.INVALID_EMAIL
    else if (e.includes(FirebaseAuthenticationErrors.TOO_MANY_REQS)) return FirebaseAuthenticationErrors.TOO_MANY_REQS
    else {
        console.log("Unable to classify auth error, returning InvalidCreds")
        return FirebaseAuthenticationErrors.INVALID_CREDS
    }
}

function yearsBetween(e: Date | undefined) {
    if (!e) return
    // Do your operations
    var endDate = new Date();
    var seconds = (endDate.getTime() - e.getTime()) / 1000;
    return seconds / 3.154e+7
}


const Dateify = (dat: any) => {
    return new Date(dat)
}

const toJSON = (meta: string) => {
    if (meta.startsWith("[") || meta.startsWith("{"))
        return JSON.parse(jsonrepair(meta))
    else return [{"type": "Paragraph", "content": "We seem to be facing a technical difficulty please try again later"}]
}

export {
    FirebaseAuthenticationErrors,
    classifyFirebaseAuthError,
    yearsBetween,
    Dateify,
    toJSON
}

export type {
    MegaFile,
    UserInformation,
    Preferences,
    BookInformationData
}