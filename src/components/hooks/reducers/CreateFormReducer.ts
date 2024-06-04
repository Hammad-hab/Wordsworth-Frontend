interface Action {
    type: "username_change" | "password_change" | "cpassword_change" | "email_change",
    displayName?: string,
    password?: string
    confirmedPassword?: string
    email?: string
}

const initialState = {displayName:"", password: "", confirmedPassword: "", email: ""}
const CreateFormReducer = (state : any, action: Action) => {
    switch (action.type) {
        case "username_change": {
            return {
                ...state,
                displayName: action.displayName,
            }
        }

        case "password_change": {
            return {
                ...state,
                password: action.password
            }
        }

        case "cpassword_change": {
            return {
                ...state,
                confirmedPassword: action.confirmedPassword
            }
        }

        case "email_change": {
            return {
                ...state,
                email: action.email
            }
        }
    
        default:
            throw Error(`Unknown action type ${action.type}`)
            break;
    }
}


export {
    CreateFormReducer,
    initialState
}