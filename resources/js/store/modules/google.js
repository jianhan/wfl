import * as mutationTypes from '../mutation-types'
import * as envs from '../../.env'

// initial state
const initialState = {
    radius: 500,
    minprice: null,
    maxprice: null,
    restaurants: [],
    nextPageTokens: [{
        isCurrent: true,
        pageToken: ''
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

        return state.nextPageTokens[i + direction].pageToken
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
        // reset results
        commit(mutationTypes.ADD_NEXT_PAGETOKEN, {
            isCurrent: true,
            pageToken: ''
        })

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
            nextPageToken: nextPageToken
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

            if (nextPageToken !== '') {
                commit(mutationTypes.RESET_NEXT_PAGETOKEN)
                commit(mutationTypes.SET_NEXT_PAGETOKEN, nextPageToken)
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
            if (i == 0) {
                state.nextPageTokens[i].isCurrent = true
            } else {
                state.nextPageTokens[i].isCurrent = false
            }
        });
    },
    [mutationTypes.SET_NEXT_PAGETOKEN](state, nextPageToken) {
        state.nextPageTokens.forEach((pt, i) => {
            if (state.nextPageTokens[i].pageToken == pt && typeof state.nextPageTokens[i - 1] !== 'undefined') {
                state.nextPageTokens[i - 1].isCurrent = true
            }
        });
    },
    [mutationTypes.ADD_NEXT_PAGETOKEN](state, {
        isCurrent,
        pageToken
    }) {
        state.nextPageTokens.push({
            isCurrent,
            pageToken
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
