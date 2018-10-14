<template>
    <form-wizard @on-complete="handleComplete" @on-loading="setLoading" @on-validate="handleValidation" @on-error="handleErrorMessage" shape="circle" color="#20a0ff" error-color="#e74c3c">
        <tab-content title="Data Source" icon="fa fa-user" :before-change="validateDatasource">
            <b-card-group deck class="mb-3">
                <b-card bg-variant="primary" text-variant="white" :header="`<strong>G</strong>oogle`" class="text-center">
                    <p class="card-text">Build with comprehensive points of interest data. Count on accurate, real-time location information.</p>
                    <em slot="footer"><b-button @click="handleSelectDataSource('google')" :pressed="isDataSourcePressed('google')" variant="outline-warning">Select</b-button></em>
                </b-card>
                <b-card style="background-color:#d20247" text-variant="white" :header="`<strong>Z</strong>omato`" class="text-center">
                    <p class="card-text">Provide freshest and most exhaustive information for over 1.5 million restaurants across 10,000 cities globally.</p>
                    <em slot="footer"><b-button @click="handleSelectDataSource('zomato')" :pressed="isDataSourcePressed('zomato')" variant="outline-warning">Select</b-button></em>
                </b-card>
            </b-card-group>
    
            <b-card-group deck class="mb-3">
                <b-card style="background-color: #dc091c" text-variant="white" :header="`<strong>Y</strong>elp`" class="text-center">
                    <p class="card-text">User Reviews and Recommendations of Best Restaurants, Shopping, Nightlife, Food, Entertainment, Things to Do, Services and More.</p>
                    <em slot="footer"><b-button @click="handleSelectDataSource('yelp')" :pressed="isDataSourcePressed('yelp')" variant="outline-warning">Select</b-button></em>
                </b-card>
                <b-card style="background-color: #00b0a9" text-variant="white" :header="`<strong>H</strong>ere`" class="text-center">
                    <p class="card-text">Provide Mapping, Places, Geocoding, Routing, Traffic and much more!</p>
                    <em slot="footer"><b-button @click="handleSelectDataSource('here')" :pressed="isDataSourcePressed('here')" variant="outline-warning">Select</b-button></em>
                </b-card>
            </b-card-group>
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
            handleSelectDataSource(dataSource) {
                this.$store.commit(`wizard/${mutationTypes.UPDATE_SELECTED_DATASOURCE}`, dataSource)
            },
            isDataSourcePressed(dataSource) {
                return this.selectedDatasource === dataSource
            },
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
            },
            validateDatasource: function() {
                return new Promise((resolve, reject) => {
                    if (_.isString(this.selectedDatasource) && _.trim(this.selectedDatasource) !== '') {
                        resolve(true)
                    } else {
                        resolve(false)
                    }
                })
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