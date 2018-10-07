<template>
    <div>
        <b-form @submit="handleSubmit" @reset="handleReset">
            <b-form-group id="current_address" description="Enter your current address" label="Address" label-for="location">
                <gmap-autocomplete @place_changed="setPlace" class="form-control"></gmap-autocomplete>
                {{ form.latitude }}
            </b-form-group>
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
    
    export default {
        components: {
            'b-form': bForm,
            'b-form-group': bFormGroup,
            'b-button': bButton,
            'b-form-input': bFormInput,
            'b-form-select': bFormSelect,
            'b-form-checkbox': bFormCheckbox,
            'b-form-checkbox-group': bFormCheckboxGroup,
        },
        data() {
            return {
                place: null,
                form: {
                    latitude: '',
                    longitude: '',
                }
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