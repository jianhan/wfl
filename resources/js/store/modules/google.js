import * as mutationTypes from '../mutation-types'
import * as envs from '../../.env'
import Vue from 'vue'

// initial state
const initialState = {
    radius: 500,
    minprice: null,
    maxprice: null,
    restaurants: [],
    nextPageTokens: [{
        isCurrent: true,
        nextPageToken: ''
    }]
}

// getters
const getters = {
    hasRestaurants: state => {
        return _.size(state.restaurants) > 0
    },
    hasNextPageToken: state => {},
    hasPreviousPageToken: state => {

    },
    getCurrentPageToken: state => {
        for (const index of state.nextPageTokens.keys()) {
            if (state.nextPageTokens[index].isCurrent) {
                return index
            }
        }

        return false
    },
    siblingPageToken: (state, getters) => direction => {
        const i = getters.getCurrentPageToken
        if (typeof state.nextPageTokens[i + direction] === 'undefined') {
            return false
        }

        return state.nextPageTokens[i + direction].nextPageToken
    }
}

const actions = {
    processSearch({
        commit,
        state,
        getters,
        rootState,
        rootGetters
    }, {
        direction
    }) {


        // set loading
        commit(`wizard/${mutationTypes.UPDATE_IS_LOADING}`, true, {
            root: true
        })

        // init page tokens
        if (_.size(state.nextPageTokens) == 0) {
            commit(mutationTypes.RESET_RESTAURANTS, [])
        }

        // init payload
        let payload = {}

        // check if current pagetoken is set, if it is, then just use the token
        const nextPageToken = getters.siblingPageToken(direction)

        payload = nextPageToken ? {
            pagetoken: nextPageToken
        } : Object.assign({}, state, {
            latitude: rootState.wizard.latitude,
            longitude: rootState.wizard.longitude
        })

        axios.post(`${envs.HOST_URL}nearby-restaurants/google`,
            payload
        ).then(r => {
            commit(`wizard/${mutationTypes.UPDATE_IS_LOADING}`, false, {
                root: true
            })
            commit(mutationTypes.UPDATE_RESTAURANTS, r.data.results)

            const nextPageToken = _.get(r, 'data.next_page_token', '')
            commit(mutationTypes.RESET_NEXT_PAGETOKEN)
            console.log(direction)
            if (direction == 0) {
                commit(mutationTypes.ADD_NEXT_PAGETOKEN, {
                    isCurrent: true,
                    nextPageToken
                })
            }

        }).catch(e => {
            commit(`wizard/${mutationTypes.UPDATE_IS_LOADING}`, false, {
                root: true
            })

            if (e.response.status == 422) {
                commit(`wizard/${mutationTypes.UPDATE_ERRORS_OBJECT}`, e.response.data, {
                    root: true
                })
            } else {
                const message = _.get(e, 'response.data.message', _.get(e, 'response.statusText', ''))
                commit(`wizard/${mutationTypes.UPDATE_ERRORS_OBJECT}`, e.response.data, {
                    message: `${e.response.status} : ${message}`
                })
            }
        })
    },
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
    [mutationTypes.RESET_RESTAURANTS](state) {
        state.restaurants = []
    },
    [mutationTypes.RESET_NEXT_PAGETOKEN](state) {
        state.nextPageTokens.forEach((pt, i) => {
            state.nextPageTokens[i].isCurrent = false
            // state.nextPageTokens[i].isCurrent = i == 0
        });
    },
    [mutationTypes.SET_NEXT_PAGETOKEN](state, nextPageToken) {
        state.nextPageTokens.forEach((pt, i) => {
            if (pt.nextPageToken == nextPageToken && typeof state.nextPageTokens[i - 1] !== 'undefined') {
                state.nextPageTokens[i - 1].isCurrent = true
            }
        });
    },
    [mutationTypes.ADD_NEXT_PAGETOKEN](state, {
        isCurrent,
        nextPageToken
    }) {
        state.nextPageTokens.push({
            isCurrent,
            nextPageToken
        })
    }
}

export default {
    namespaced: true,
    state: initialState,
    mutations,
    getters,
    actions,
}
