<template>
    <div>
        <b-form @submit="handleSubmit" @reset="handleReset">
    
            <b-form-group description="Enter your current address as starting location" label="Address">
                <gmap-autocomplete @place_changed="setPlace" class="form-control"></gmap-autocomplete>
            </b-form-group>
    
            <b-form-group label="Radius" description="Searching radius defines the distance (in meters) within which will search be performed">
                <b-form-radio-group buttons button-variant="outline-primary" size="md" v-model="form.radius" :options="radiusOptions" />
            </b-form-group>
    
            <b-form-group description="Datasource determines where you would like results to be fetched from" label="Select Datasource">
                <b-form-radio-group v-model="selectedDatasource">
                    <b-card-group deck>
                        <b-card v-for="(ds,i) in datasources" v-bind:key="i" :img-src="'images/'+ds.name+'.svg'" img-top class="text-center">
                            <div slot="footer">
                                <b-form-radio :value="i"></b-form-radio>
                            </div>
                        </b-card>
                    </b-card-group>
                </b-form-radio-group>
            </b-form-group>
    
            <div class="row" v-show="canShowGoogleOptions">
                <b-form-group label="Minimal Price" description="Set minimal price for searching" class="col-md-6">
                    <b-form-select v-model="googleNearbySearch.minprice" :options="googleNearbySearchPriceOptions" />
                </b-form-group>
                <b-form-group label="Max Price" description="Set max price for searching" class="col-md-6">
                    <b-form-select v-model="googleNearbySearch.maxprice" :options="googleNearbySearchPriceOptions" />
                </b-form-group>
            </div>
    
            <b-alert show v-if="errors !== null" variant="warning">
                {{ errors.message }}
                <ul>
                    <li v-for="(e, i) in errors.errors" v-bind:key="i">
                        {{ e[0] }}
                    </li>
                </ul>
            </b-alert>
            <b-button-group v-if="selectedDatasource !== null">
                <b-button @click="handleSearch" variant="success">
                    <i class="fas fa-spinner fa-spin" v-if="isSearching"></i>
                    <i class="fas fa-search" v-if="!isSearching"></i> Search
                </b-button>
                <b-button @click="handleReset" variant="default">
                    <i class="fas fa-sync"></i> Reset
                </b-button>
            </b-button-group>
    
        </b-form>
        <google-results :googleResults="googleResults">
            <slot name="pagination">test</slot>
        </google-results>
    </div>
</template>

<script>
    import bForm from 'bootstrap-vue/es/components/form/form'
    import bFormGroup from 'bootstrap-vue/es/components/form-group/form-group'
    import bButtonGroup from 'bootstrap-vue/es/components/button-group/button-group'
    import bButton from 'bootstrap-vue/es/components/button/button'
    import bFormInput from 'bootstrap-vue/es/components/form-input/form-input'
    import bFormSelect from 'bootstrap-vue/es/components/form-select/form-select'
    import bFormCheckbox from 'bootstrap-vue/es/components/form-checkbox/form-checkbox'
    import bFormCheckboxGroup from 'bootstrap-vue/es/components/form-checkbox/form-checkbox-group'
    import bFormRadio from 'bootstrap-vue/es/components/form-radio/form-radio'
    import bFormRadioGroup from 'bootstrap-vue/es/components/form-radio/form-radio-group'
    import bCard from 'bootstrap-vue/es/components/card/card'
    import bAlert from 'bootstrap-vue/es/components/alert/alert'
    import bCardGroup from 'bootstrap-vue/es/components/card/card-group'
    import * as envs from '../.env'
    import GoogleResults from './GoogleResults'
    
    export default {
        components: {
            'b-form': bForm,
            'b-form-group': bFormGroup,
            'b-button': bButton,
            'b-form-input': bFormInput,
            'b-form-select': bFormSelect,
            'b-form-checkbox': bFormCheckbox,
            'b-form-checkbox-group': bFormCheckboxGroup,
            'b-form-radio': bFormRadio,
            'b-form-radio-group': bFormRadioGroup,
            'b-card': bCard,
            'b-card-group': bCardGroup,
            'b-alert': bAlert,
            'b-button-group': bButtonGroup,
            'google-results': GoogleResults,
        },
        data() {
            return {
                isSearching: false,
                errors: null,
                selectedDatasource: null,
                datasources: [{
                        'name': 'zomato'
                    },
                    {
    
                        'name': 'google'
                    },
                    {
                        'name': 'yelp'
    
                    },
                    {
                        'name': 'here'
                    }
                ],
                place: null,
                form: {
                    latitude: '',
                    longitude: '',
                    radius: 500
                },
                googleNearbySearch: {
                    minprice: null,
                    maxprice: null,
                },
                googleNearbySearchPriceOptions: [{
                        text: 'select price',
                        value: null
                    }, {
                        text: 'most affortable',
                        value: 0
                    },
                    {
                        text: 'affortable',
                        value: 1
                    },
                    {
                        text: 'average',
                        value: 2
                    },
                    {
                        text: 'expensive',
                        value: 3
                    },
                    {
                        text: 'luxury',
                        value: 4
                    }
                ],
                radiusOptions: [{
                        text: '500m',
                        value: 500
                    },
                    {
                        text: '1000m',
                        value: 1000
                    },
                    {
                        text: '2000m',
                        value: 2000
                    },
                    {
                        text: '5000m',
                        value: 5000
                    },
                ],
                googleResults: null
            }
        },
        computed: {
            canShowGoogleOptions: function() {
                return this.selectedDatasource === 1
            }
        },
        watch: {
            place: function(val) {
                const latitude = _.get(val, 'geometry.location.lat', false)
                const longitude = _.get(val, 'geometry.location.lng', false)
                if (latitude && longitude) {
                    this.form.latitude = latitude()
                    this.form.longitude = longitude()
                }
            }
        },
        methods: {
            setPlace(place) {
                this.place = place
            },
            setDatasource(index) {
                this.selectedDatasource = index
            },
            handleSubmit(e) {},
            handleReset(e) {},
            handleSearch() {
                this.googleResults = null
                this.isSearching = true
                this.errors = null
                axios.post(`${envs.HOST_URL}nearby-restaurants/google`,
                    Object.assign({}, this.form, this.googleNearbySearch)
                ).then(r => {
                    if (this.selectedDatasource == 1) {
                        this.googleResults = r.data
                    }
                    this.isSearching = false
                }).catch(e => {
                    this.isSearching = false
                    if (e.response.status == 422) {
                        this.errors = e.response.data
                    } else {
                        const message = _.get(e, 'response.data.message', _.get(e, 'response.statusText', ''))
                        this.errors = {
                            message: `${e.response.status} : ${message}`
                        }
                    }
                })
            },
            handleReset() {
                this.form.radius = 500
                this.selectedDatasource = 1
                this.googleNearbySearch = {
                    minprice: null,
                    maxprice: null
                }
                this.googleResults = null
            }
        },
        mounted() {
            this.selectedDatasource = 1
        }
    };
</script>

<style>
    ul {
        list-style: none;
    }
</style>
