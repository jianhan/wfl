<template>
    <b-form-group description="Enter your current address as starting location" label="Address">
        <gmap-autocomplete @place_changed="handlePlaceChanged" class="form-control"></gmap-autocomplete>
    </b-form-group>
</template>

<script>
    import bFormGroup from "bootstrap-vue/es/components/form-group/form-group";
    import * as mutationTypes from '../store/mutation-types.js'

    export default {
        name: 'google-auto-complete',
        components: {
            "b-form-group": bFormGroup,
        },
        methods: {
            handlePlaceChanged(place) {
                this.$store.commit(`wizard/${mutationTypes.UPDATE_SELECTED_ADDRESS}`, place.formatted_address)
                const latitude = _.get(place, "geometry.location.lat", false);
                const longitude = _.get(place, "geometry.location.lng", false);
                if (latitude && longitude) {
                    this.$store.commit(`wizard/${mutationTypes.UPDATE_LATITUDE_LONGITUDE}`, {
                        latitude: latitude(),
                        longitude: longitude()
                    });
                }
            }
        }
    }
</script>
