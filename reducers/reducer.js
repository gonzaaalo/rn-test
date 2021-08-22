import initialState from "../store/initialState";

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "LOAD_CHARACTERS":
            return { ...state, characters: action.data };
        case "UPDATE_CHARACTER":
            const updatedData = state.characters.map((c) =>
                c.url === action.idCharacter ?
                    action.data : c
            );
            return { ...state, characters: updatedData };
        case "DELETE_CHARACTER":
            const newData = state.characters.filter((c) => c.url !== action.idCharacter)
            return { ...state, characters: newData };
        default:
            return state
    }
}

export default reducer;