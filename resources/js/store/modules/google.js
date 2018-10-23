import * as mutationTypes from '../mutation-types'

// initial state
const initialState = {
    radius: 500,
    minprice: null,
    maxprice: null,
    pagetoken: '',
    restaurants: [],
    tokens: [],
    currentPageToken: ''
}

// getters
const getters = {
    hasRestaurants: (state) => {
        return _.size(state.restaurants) > 0
    },
    hasNextPageToken: (state) => {
        return state.pagetoken !== ''
    }
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
    },
    [mutationTypes.RESET_RESTAURANTS](state) {
        state.restaurants = []
    },
    [mutationTypes.ADD_PAGETOKEN](state, payload) {
        state.tokens.push(payload)
    },
    [mutationTypes.UPDATE_CURRENT_PAGETOKEN](state, payload) {
        state.currentPageToken = payload
    }
}

export default {
    namespaced: true,
    state: initialState,
    mutations,
    getters,
}
