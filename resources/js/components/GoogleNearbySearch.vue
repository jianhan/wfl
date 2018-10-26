<template>
    <div>

        <b-form-group label="Radius" description="Searching radius defines the distance (in meters) within which will search be performed">
            <b-form-radio-group buttons button-variant="outline-primary" size="md" v-model="radius" :options="radiusOptions" />
        </b-form-group>
    
        <div class="row">
            <b-form-group label="Minimal Price" description="Set minimal price for searching" class="col-md-6">
                <b-form-select v-model="minprice" :options="googleNearbySearchPriceOptions" />
            </b-form-group>
            <b-form-group label="Max Price" description="Set max price for searching" class="col-md-6">
                <b-form-select v-model="maxprice" :options="googleNearbySearchPriceOptions" />
            </b-form-group>
        </div>

    </div>
</template>

<script>
    import bFormGroup from "bootstrap-vue/es/components/form-group/form-group";
    import bFormRadioGroup from "bootstrap-vue/es/components/form-radio/form-radio-group";
    import bFormSelect from "bootstrap-vue/es/components/form-select/form-select";
    import * as mutationTypes from '../store/mutation-types.js'
    
    export default {
        name: 'google-nearby-search',
        components: {
            "b-form-group": bFormGroup,
            "b-form-radio-group": bFormRadioGroup,
            "b-form-select": bFormSelect
        },
        data() {
            return {
                fullAddress: '',
                googleNearbySearchPriceOptions: [{
                        text: "select price",
                        value: null
                    },
                    {
                        text: "most affortable",
                        value: 0
                    },
                    {
                        text: "affortable",
                        value: 1
                    },
                    {
                        text: "average",
                        value: 2
                    },
                    {
                        text: "expensive",
                        value: 3
                    },
                    {
                        text: "luxury",
                        value: 4
                    }
                ],
                radiusOptions: [{
                        text: "500m",
                        value: 500
                    },
                    {
                        text: "1000m",
                        value: 1000
                    },
                    {
                        text: "2000m",
                        value: 2000
                    },
                    {
                        text: "5000m",
                        value: 5000
                    }
                ]
            };
        },
        computed: {
            radius: {
                get() {
                    return this.$store.state.google.radius;
                },
                set(value) {
                    this.$store.commit(`google/${mutationTypes.UPDATE_RADIUS}`, value);
                }
            },
            minprice: {
                get() {
                    return this.$store.state.google.minprice;
                },
                set(value) {
                    this.$store.commit(`google/${mutationTypes.UPDATE_MIN_PRICE}`, value);
                }
            },
            maxprice: {
                get() {
                    return this.$store.state.google.maxprice;
                },
                set(value) {
                    this.$store.commit(`google/${mutationTypes.UPDATE_MAX_PRICE}`, value);
                }
            }
        }
    };
</script>
