interface Action {
    type: "username_change" | "password_change",
    username?: string,
    password?: string
}

const initialState = {username:"", password: ""}
const LoginReducer = (state : any, action: Action) => {
    switch (action.type) {
        case "username_change": {
            return {
                username: action.username,
                password: state.password
            }
        }

        case "password_change": {
            return {
                username: state.username,
                password: action.password
            }
        }
    
        default:
            break;
    }
}


export {
    LoginReducer,
    initialState
}