<template>
    <div>
        <b-form @submit="handleSubmit" @reset="handleReset">
            <b-form-group description="Enter your current address as starting location" label="Address" label-for="location">
                <gmap-autocomplete @place_changed="setPlace" class="form-control"></gmap-autocomplete>
            </b-form-group>
            <b-form-group label="Radius" description="Searching radius defines the distance (in meters) within which will search be performed">
                <b-form-radio-group v-model="form.radius" :options="radiusOptions">
                </b-form-radio-group>
            </b-form-group>
            <img src="images/zomato.svg" />
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
    import bFormRadioGroup from 'bootstrap-vue/es/components/form-radio/form-radio-group'
    
    export default {
        components: {
            'b-form': bForm,
            'b-form-group': bFormGroup,
            'b-button': bButton,
            'b-form-input': bFormInput,
            'b-form-select': bFormSelect,
            'b-form-checkbox': bFormCheckbox,
            'b-form-checkbox-group': bFormCheckboxGroup,
            'b-form-radio-group': bFormRadioGroup,
        },
        data() {
            return {
                place: null,
                form: {
                    latitude: '',
                    longitude: '',
                    radius: 500
                },
                radiusOptions: [{
                        text: '500',
                        value: 500
                    },
                    {
                        text: '1000',
                        value: 1000
                    },
                    {
                        text: '2000',
                        value: 2000
                    },
                    {
                        text: '5000',
                        value: 5000
                    },
                ]
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
            handleSubmit(e) {},
            handleReset(e) {}
        },
        mounted() {}
    };
</script>