import * as mutationTypes from '../mutation-types'
import * as envs from '../../.env'

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
    errors: [],
    restaurants: []
}

// getters
const getters = {
    isSelectedAddressSet: (state) => {
        return state.selectedAddress != '' && this.latitude !== 0 && this.longitude !== 0
    },
    hasErrors: (state) => {
        return _.size(state.errors) > 0
    }
}

// actions
const actions = {
    processSearch({
        commit,
        state,
        rootState
    }) {
        if (state.selectedDatasource == initialState.dataSources.google) {
            axios.post(`${envs.HOST_URL}nearby-restaurants/google`,
                Object.assign({}, state, rootState.google)
            ).then(r => {
                console.log(r)
                // this.googleResults = r.data
                // this.isSearching = false
                // if (_.get(this.googleResults, 'next_page_token', false)) {
                //     this.googleNearbySearch['pagetoken'] = _.get(this.googleResults, 'next_page_token')
                // }
            }).catch(e => {
                console.log(e)
                // this.isSearching = false
                // if (e.response.status == 422) {
                //     this.errors = e.response.data
                // } else {
                //     const message = _.get(e, 'response.data.message', _.get(e, 'response.statusText', ''))
                //     this.errors = {
                //         message: `${e.response.status} : ${message}`
                //     }
                // }
            })
        }

    },
}

// mutations
const mutations = {
    [mutationTypes.UPDATE_WIZARD_IS_LOADING](state, payload) {
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
    [mutationTypes.UPDATE_ERRORS](state, payload) {
        state.errors = payload
    }
}


export default {
    namespaced: true,
    state: initialState,
    getters,
    actions,
    mutations
}
