import initialState from "../store/initialState";

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "LOAD_CHARACTERS":
            return { ...state, characters: action.data };
        case "GET_CHARACTER":
            return state.characters.some((c, i) => i !== action.idCharacter)
        case "UPDATE_CHARACTER":
            const updatedData = state.characters.map((c, i) =>
                i === action.idCharacter ?
                    action.data : c
            );
            return { ...state, characters: updatedData };
        case "DELETE_CHARACTER":
            const newData = state.characters.filter((c, i) => i !== action.idCharacter)
            return { ...state, characters: newData };
        default:
            return state
    }
}

export default reducer;