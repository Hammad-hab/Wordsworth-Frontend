enum FirebaseAuthenticationErrors {
    INVALID_CREDS="auth/invalid-credential",
    MISSING_PASSW="auth/missing-password",
    INVALID_EMAIL="auth/invalid-email",
    TOO_MANY_REQS= "auth/too-many-requests"
}

function classifyFirebaseAuthError(e:string): FirebaseAuthenticationErrors {
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
    const dateToday = new Date()
    const delta = Math.abs(dateToday.getTime() - e.getTime())
    const difference = Math.floor(delta/60*60*24*1000)
    return difference
}


export {
    FirebaseAuthenticationErrors, 
    classifyFirebaseAuthError,
    yearsBetween
}