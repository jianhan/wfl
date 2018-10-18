import * as mutationTypes from '../mutation-types'

// initial state
const initialState = {
    radius: 500,
    minprice: null,
    maxprice: null
}

const mutations = {
    [mutationTypes.UPDATE_RADIUS](state, radius) {
        state.radius = radius
    },
    [mutationTypes.UPDATE_MAX_PRICE](state, maxprice) {
        state.maxprice = maxprice
    },
    [mutationTypes.UPDATE_MIN_PRICE](state, minprice) {
        state.minprice = minprice 
    },
    [mutationTypes.RESET_GOOGLE_FORM]() {
        state = initialState
    }
}

export default {
    namespaced: true,
    state: initialState,
    mutations
}
