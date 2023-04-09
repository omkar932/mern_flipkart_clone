import { authConstants } from "../actions/constants"

const initialState = {
    token: null,
    user: {
        firstName: '',
        lastName: '',
        email: '',
        image: '',
    },
    authenticate: false,
    authenticating: false,
}
const authReducer = (state = initialState, action) => {
    console.log(action);
    switch (action.type) {
        case authConstants.LOGIN_REQUEST:
            state = {
                ...state,
                ...action.payload
            }
            break;
        case authConstants.LOGIN_SUCCESS:
            state = {
                ...state,
                user: action.payload.user,
                token: action.payload.token,
                authenticate: true,
                authenticating: false,
            }
            break;
        default:
            break;
    }
    return state
}

export default authReducer;