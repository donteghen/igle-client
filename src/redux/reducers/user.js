/* eslint-disable default-param-last */

import { FETCH_USER, LOG_IN_USER, LOG_OUT_USER, SIGN_UP_USER, UPDATE_USER_PROFILE, UPLOAD_USER_AVATAR, CHANGE_USER_PASSWORD } from "../types";


export function userReducer (state = null, action) {
    switch (action.type) {
        case FETCH_USER : 
            return action.payload 
        case SIGN_UP_USER :
            return action.payload 
        case LOG_IN_USER : 
            return action.payload 
        case LOG_OUT_USER : 
            return action.payload 
        case CHANGE_USER_PASSWORD : 
            return action.payload   
        case UPDATE_USER_PROFILE :
            return action.payload
        case UPLOAD_USER_AVATAR :
            return action.payload
        default :
            return state
    }
}

// const options = {
//     name: 'user',
//     initialState : null,
//     reducers : {
//         fetchUserReducer : fetchUser()
//     }
// }

// export const userSlice = createSlice(options)
// export const {fetchUserReducer} = userSlice.actions
// export default userSlice.reducer