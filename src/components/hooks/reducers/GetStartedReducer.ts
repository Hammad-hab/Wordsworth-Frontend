import {UserInformation} from '@/components/global/firestore'

interface UserInfoState {
    type: "gender" | "birthdate" | "hobbies" | "hobbies"| "preferences" | "additionalInformation",
    displayName?:string,
    gender?: string,
    birthdate?: Date,
    preferences?: string[] | any
    hobbies?: string[],
    additionalInformation?: string,
    userIsCustomised?:boolean
}

let initialState: UserInformation;
const GetStartedReducer = (state : any, action: UserInfoState): UserInformation | undefined => {


    const arr = ["gender", "birthdate", "preferences", "hobbies", "additionalInformation"]
    for (const property of arr) {
        if (action.type == property) {
            return {
                ...state,
                [property]: action[property] 
            }
        }
    }
    
}


export {
    GetStartedReducer,
    initialState
}