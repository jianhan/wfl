<template>
    <div>
        <b-form @submit="handleSubmit" @reset="handleReset">
            <gmap-autocomplete @place_changed="setPlace" class="form-control"></gmap-autocomplete>
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
                    email: '',
                    name: '',
                    food: null,
                    checked: []
                }
            }
        },
        methods: {
            setPlace(place) {
                this.place = place
            },
            handleSubmit(evt) {
            },
            handleReset(evt) {
            }
        },
        mounted() {
        }
    };
</script>