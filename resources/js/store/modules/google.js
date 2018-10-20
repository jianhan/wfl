import * as mutationTypes from '../mutation-types'

// initial state
const initialState = {
    radius: 500,
    minprice: null,
    maxprice: null,
    pagetoken: '',
    restaurants: []
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
    [mutationTypes.RESET_GOOGLE_FORM](state) {
        state = initialState
    },
    [mutationTypes.UPDATE_RESTAURANTS](state, payload) {
        state.restaurants = payload
    },
    [mutationTypes.UPDATE_PAGETOKEN](state, payload) {
        state.pagetoken = payload
    }
}

export default {
    namespaced: true,
    state: initialState,
    mutations
}
