import { User } from "../../classes/user"

const setUserReducer = (state = { user: new User() }, action: { user: User; type: string }) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.user
      }
    default:
      return state
  }
}
export default setUserReducer
