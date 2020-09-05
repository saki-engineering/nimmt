export function AppReducer(state, action) {
    var NewisPlayed = state.isPlayed.slice();

    switch(action.type){
        case 'toggle':
            var i = action.data.index;
            NewisPlayed[i] = !state.isPlayed[i];
            return {isPlayed: NewisPlayed}
        case 'multiOn':
            var array = action.data.array;
            array.forEach(n => {
                NewisPlayed[n] = true
            });
            return {isPlayed: NewisPlayed}
        default:
            return state;
    }
}