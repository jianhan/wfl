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
    
            <div class="row" v-show="canShowGoogleOptions" >
                <b-form-group label="Rank By" description="Specify the ranking of results" class="col-md-4">
                    <b-form-select v-model="googleNearbySearch.rankby" :options="googleNearbySearchRankbyOptions"/>
                </b-form-group>
                <b-form-group label="Minimal Price" description="Set minimal price for searching" class="col-md-4">
                    <b-form-select v-model="googleNearbySearch.minprice" :options="googleNearbySearchPriceOptions" />
                </b-form-group>
                <b-form-group label="Max Price" description="Set max price for searching" class="col-md-4">
                    <b-form-select v-model="googleNearbySearch.maxprice" :options="googleNearbySearchPriceOptions" />
                </b-form-group>
            </div>

            <b-button variant="success">Search</b-button>

        </b-form>
    </div>
</template>

<script>
    import bForm from 'bootstrap-vue/es/components/form/form'
    import bFormGroup from 'bootstrap-vue/es/components/form-group/form-group'
    import bButton from 'bootstrap-vue/es/components/button/button'
    import bFormInput from 'bootstrap-vue/es/components/form-input/form-input'
    import bFormSelect from 'bootstrap-vue/es/components/form-select/form-select'
    import bFormCheckbox from 'bootstrap-vue/es/components/form-checkbox/form-checkbox'
    import bFormCheckboxGroup from 'bootstrap-vue/es/components/form-checkbox/form-checkbox-group'
    import bFormRadio from 'bootstrap-vue/es/components/form-radio/form-radio'
    import bFormRadioGroup from 'bootstrap-vue/es/components/form-radio/form-radio-group'
    import bCard from 'bootstrap-vue/es/components/card/card'
    import bCardGroup from 'bootstrap-vue/es/components/card/card-group'
    
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
        },
        data() {
            return {
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
                    rankby: 'prominence',
                },
                googleNearbySearchRankbyOptions: [{
                        text: 'rank by prominence',
                        value: 'prominence'
                    },
                    {
                        text: 'rank by distance',
                        value: 'distance'
                    },
                ],
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
                ]
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
            handleReset(e) {}
        },
        mounted() {}
    };
</script>