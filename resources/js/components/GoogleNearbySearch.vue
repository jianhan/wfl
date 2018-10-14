<template>
    <div>
        <b-form-group description="Enter your current address as starting location" label="Address">
            <gmap-autocomplete @place_changed="setPlace" class="form-control"></gmap-autocomplete>
        </b-form-group>
    
        <b-form-group label="Radius" description="Searching radius defines the distance (in meters) within which will search be performed">
            <b-form-radio-group buttons button-variant="outline-primary" size="md" v-model="formData.radius" :options="radiusOptions" />
        </b-form-group>
    </div>
</template>

<script>
    import bFormGroup from 'bootstrap-vue/es/components/form-group/form-group'
    import bFormRadioGroup from 'bootstrap-vue/es/components/form-radio/form-radio-group'

    export default {
        components: {
            'b-form-group': bFormGroup,
            'b-form-radio-group': bFormRadioGroup,
        },
        data() {
            return {
                place: null,
                formData: {
                    latitude: '',
                    longitude: '',
                    radius: 500,
                    minprice: null,
                    maxprice: null
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
            }
        },
        watch: {
            place: function(val) {
                const latitude = _.get(val, 'geometry.location.lat', false)
                const longitude = _.get(val, 'geometry.location.lng', false)
                if (latitude && longitude) {
                    this.formData.latitude = latitude()
                    this.formData.longitude = longitude()
                }
            }
        },
        methods: {
            setPlace(place) {
                this.place = place
            }
        }
    }
</script>
