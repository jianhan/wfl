import * as mutationTypes from '../mutation-types'
import * as envs from '../../.env'

const errorsObject = {
    message: '',
    errors: []
}

// initial state
const initialState = {
    // dataSources which is not mutable
    dataSources: {
        google: 'google',
        zomato: 'zomato',
        yelp: 'yelp',
        here: 'here',
    },
    isLoading: false,
    selectedAddress: '',
    selectedDatasource: 'google',
    latitude: 0,
    longitude: 0,
    errorsObject
}

// getters
const getters = {
    isSelectedAddressSet: (state) => {
        return state.selectedAddress != '' && this.latitude !== 0 && this.longitude !== 0
    },
    hasErrors: (state) => {
        return _.size(_.get(state, 'errorsObject.errors', [])) > 0
    }
}

// actions
const actions = {
    processSearch({
        commit,
        state,
        rootState
    }) {
        commit(`google/${mutationTypes.RESET_RESTAURANTS}`, [], {
            root: true
        })
        if (state.selectedDatasource == initialState.dataSources.google) {
            commit(mutationTypes.UPDATE_IS_LOADING, true)
            axios.post(`${envs.HOST_URL}nearby-restaurants/google`,
                Object.assign({}, state, rootState.google)
            ).then(r => {
                commit(mutationTypes.UPDATE_IS_LOADING, false)
                commit(`google/${mutationTypes.UPDATE_RESTAURANTS}`, r.data.results, {
                    root: true
                })
                if (_.get(this.googleResults, 'next_page_token', false)) {
                    commit(`google/${mutationTypes.UPDATE_PAGETOKEN}`, this.googleResults.next_page_token, {
                        root: true
                    })
                }
            }).catch(e => {
                commit(mutationTypes.UPDATE_IS_LOADING, false)
                if (e.response.status == 422) {
                    commit(mutationTypes.UPDATE_ERRORS_OBJECT, e.response.data)
                } else {
                    const message = _.get(e, 'response.data.message', _.get(e, 'response.statusText', ''))
                    commit(mutationTypes.UPDATE_ERRORS_OBJECT, e.response.data, {
                        message: `${e.response.status} : ${message}`
                    })
                }
            })
        }
    },
}

// mutations
const mutations = {
    [mutationTypes.UPDATE_IS_LOADING](state, payload) {
        state.isLoading = payload
    },
    [mutationTypes.UPDATE_SELECTED_DATASOURCE](state, payload) {
        state.selectedDatasource = payload
    },
    [mutationTypes.UPDATE_LATITUDE_LONGITUDE](state, {
        latitude,
        longitude
    }) {
        state.latitude = latitude
        state.longitude = longitude
    },
    [mutationTypes.UPDATE_SELECTED_ADDRESS](state, payload) {
        state.selectedAddress = payload
    },
    [mutationTypes.RESET_WIZARD](state) {
        state = initialState
    },
    [mutationTypes.RESET_SELECTED_ADDRESS](state) {
        state.selectedAddress = ''
        state.latitude = 0
        state.longitude = 0
    },
    [mutationTypes.UPDATE_ERRORS_OBJECT](state, payload) {
        state.errorsObject = payload
    }
}


export default {
    namespaced: true,
    state: initialState,
    getters,
    actions,
    mutations
}
