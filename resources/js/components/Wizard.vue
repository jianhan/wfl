<template>
    <form-wizard @on-complete="handleComplete" @on-loading="setLoading" @on-validate="handleValidation" @on-error="handleErrorMessage" shape="circle" color="#20a0ff" error-color="#e74c3c">
        <tab-content title="Data Source" icon="fa fa-user">
            <b-form-radio-group v-model="selectedDatasource">
                <b-card-group deck>
                    <b-card v-for="(ds,i) in dataSources" v-bind:key="i" :img-src="'images/'+ds+'.svg'" img-top class="text-center">
                        <div slot="footer">
                            <b-form-radio :value="i"></b-form-radio>
                        </div>
                    </b-card>
                </b-card-group>
            </b-form-radio-group>
        </tab-content>
        <tab-content title="Additional Info" :before-change="validateAsync" icon="ti-settings">
            Second tab
        </tab-content>
        <tab-content title="Last step" icon="ti-check">
            Third tab
        </tab-content>
    
        <div class="loader" v-if="loadingWizard"></div>
        <div v-if="errorMsg">
            <span class="error">{{errorMsg}}</span>
        </div>
    </form-wizard>
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
    import {
        FormWizard,
        TabContent
    } from "vue-form-wizard";
    import "vue-form-wizard/dist/vue-form-wizard.min.css";
    import {
        mapState
    } from "vuex";
    import * as mutationTypes from '../store/mutation-types.js'
    
    export default {
        components: {
            FormWizard,
            TabContent,
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
        },
        data() {
            return {
                loadingWizard: false,
                errorMsg: null,
                count: 0
            };
        },
        computed: {
            ...mapState({
                dataSources: state => state.wizard.dataSources,
    
                // countPlusLocalState(state) {
                //     return state.count + this.localCount;
                // }
            }),
            selectedDatasource: {
                get() {
                    return this.$store.state.wizard.selectedDatasource
                },
                set(value) {
                    this.$store.commit(`wizard/${mutationTypes.UPDATE_SELECTED_DATASOURCE}`, value)
                }
            },
        },
        methods: {
            handleComplete: function() {
                alert("Yay. Done!");
            },
            setLoading: function(value) {
                this.loadingWizard = value;
            },
            handleValidation: function(isValid, tabIndex) {
                console.log("Tab: " + tabIndex + " valid: " + isValid);
            },
            handleErrorMessage: function(errorMsg) {
                this.errorMsg = errorMsg;
            },
            validateAsync: function() {
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        if (this.count < 1) {
                            this.count++;
                            reject(
                                "This is a custom validation error message. Click next again to get rid of the validation"
                            );
                        } else {
                            this.count = 0;
                            resolve(true);
                        }
                    }, 1000);
                });
            }
        }
    };
</script>

<style>
    span.error {
        color: #e74c3c;
        font-size: 20px;
        display: flex;
        justify-content: center;
    }
</style>