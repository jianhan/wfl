<template>
    <div>
        <b-form @submit="onSubmit" @reset="onReset" v-if="show">
            <b-form-group id="exampleInputGroup1" label="Email address:" label-for="exampleInput1" description="We'll never share your email with anyone else.">
                <b-form-input id="exampleInput1" type="email" v-model="form.email" required placeholder="Enter email">
                </b-form-input>
            </b-form-group>
            <b-form-group id="exampleInputGroup2" label="Your Name:" label-for="exampleInput2">
                <b-form-input id="exampleInput2" type="text" v-model="form.name" required placeholder="Enter name">
                </b-form-input>
            </b-form-group>
            <b-form-group id="exampleInputGroup3" label="Food:" label-for="exampleInput3">
                <b-form-select id="exampleInput3" :options="foods" required v-model="form.food">
                </b-form-select>
            </b-form-group>
            <b-form-group id="exampleGroup4">
                <b-form-checkbox-group v-model="form.checked" id="exampleChecks">
                    <b-form-checkbox value="me">Check me out</b-form-checkbox>
                    <b-form-checkbox value="that">Check that out</b-form-checkbox>
                </b-form-checkbox-group>
            </b-form-group>
            <b-button type="submit" variant="primary">Submit</b-button>
            <b-button type="reset" variant="danger">Reset</b-button>
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
                form: {
                    email: '',
                    name: '',
                    food: null,
                    checked: []
                },
                foods: [{
                        text: 'Select One',
                        value: null
                    },
                    'Carrots', 'Beans', 'Tomatoes', 'Corn'
                ],
                show: true
            }
        },
        methods: {
            onSubmit(evt) {
                evt.preventDefault();
                alert(JSON.stringify(this.form));
            },
            onReset(evt) {
                evt.preventDefault();
                /* Reset our form values */
                this.form.email = '';
                this.form.name = '';
                this.form.food = null;
                this.form.checked = [];
                /* Trick to reset/clear native browser form validation state */
                this.show = false;
                this.$nextTick(() => {
                    this.show = true
                });
            }
        }
    };
</script>