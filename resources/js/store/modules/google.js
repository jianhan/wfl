import * as mutationTypes from '../mutation-types'

// initial state
const initialState = {
    radius: 500,
    minprice: null,
    maxprice: null
}

const mutations = {
    [mutationTypes.UPDATE_RADIUS](state, radius) {
        Vue.set(state, 'googleFormData', Object.assign({}, state.googleFormData, {
            radius
        }))
    },
    [mutationTypes.UPDATE_MAX_PRICE](state, maxprice) {
        Vue.set(state, 'googleFormData', Object.assign({}, state.googleFormData, {
            maxprice
        }))
    },
    [mutationTypes.UPDATE_MIN_PRICE](state, minprice) {
        Vue.set(state, 'googleFormData', Object.assign({}, state.googleFormData, {
            minprice
        }))
    },
    [mutationTypes.RESET_GOOGLE_FORM]() {
        state = initialState
    }
}

const actions = {}

const getters = {}

export default {
    namespaced: true,
    state: initialState,
    getters,
    actions,
    mutations
}
