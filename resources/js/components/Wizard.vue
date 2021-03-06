<template>
    <form-wizard title="Search Near by Restaurants" subtitle="Step over the wizard to find restaurant for lunch" finishButtonText="Search" @on-complete="handleComplete" @on-loading="setLoading" @on-validate="handleValidation" @on-error="handleErrorMessage"
        shape="circle" color="#20a0ff" error-color="#e74c3c">
    
        <tab-content title="Data Source" icon="fas fa-database">
    
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
    
        <tab-content title="Fill Address" :before-change="handleProcessSearch" icon="fas fa-map-marked">
            <b-form-group v-if="isSelectedAddressSet" label="Selected Address" description="Address will be used for finding nearby places">
                <strong v-html="selectedAddress"></strong>
                <b-button class="float-right" @click="handleChangeAddress" size="sm" variant="success">Change</b-button>
            </b-form-group>
            <google-auto-complete v-if="!isSelectedAddressSet"></google-auto-complete>
            <google-nearby-search></google-nearby-search>
        </tab-content>
    
        <tab-content title="Resturants" icon="fas fa-utensils">
            <div v-if="isLoading" class="d-flex justify-content-center">
                <orbit-spinner :animation-duration="1200" :size="120" :color="'#626365'" />
            </div>
            <google-results></google-results>
        </tab-content>
    
        <template slot="footer" slot-scope="props">
            <div class="wizard-footer-left">
               <wizard-button v-if="props.activeTabIndex != 0" @click.native="props.prevTab()" :style="props.fillButtonStyle">Previous</wizard-button>
            </div>
            <div class="wizard-footer-right">
              <wizard-button v-if="!props.isLastStep" @click.native="props.nextTab()" class="wizard-footer-right" :style="props.fillButtonStyle">Next</wizard-button>
              <wizard-button v-else @click.native="handleComplete" class="wizard-footer-right finish-button" :style="props.fillButtonStyle">Reset</wizard-button>
            </div>
        </template>

        <notifications group="selectedAddressEmpty" animation-type="velocity" :max='1' />
    </form-wizard>
</template>

<script>
    import bCard from "bootstrap-vue/es/components/card/card";
    import bFormGroup from "bootstrap-vue/es/components/form-group/form-group";
    import bButton from "bootstrap-vue/es/components/button/button";
    import bCardGroup from "bootstrap-vue/es/components/card/card-group";
    import * as envs from "../.env";
    import {
        FormWizard,
        TabContent
    } from "vue-form-wizard";
    import "vue-form-wizard/dist/vue-form-wizard.min.css";
    import {
        mapState,
        mapGetters
    } from "vuex";
    import * as mutationTypes from "../store/mutation-types.js";
    import GoogleNearbySearch from "./GoogleNearbySearch";
    import GoogleAutoComplete from "./GoogleAutoComplete.vue";
    import GoogleResults from "./GoogleResults";
    import {} from "vuex";
    import {
        OrbitSpinner
    } from "epic-spinners";
    
    export default {
        components: {
            FormWizard,
            TabContent,
            GoogleAutoComplete,
            GoogleNearbySearch,
            OrbitSpinner,
            GoogleResults,
            "b-button": bButton,
            "b-card": bCard,
            "b-card-group": bCardGroup,
            "b-form-group": bFormGroup
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
                // wizard
                dataSources: state => state.wizard.dataSources,
                isLoading: state => state.wizard.isLoading,
                selectedAddress: state => state.wizard.selectedAddress,
                selectedDatasource: state => state.wizard.selectedDatasource,
                latitude: state => state.wizard.latitude,
                longitude: state => state.wizard.longitude,
                // google
                radius: state => state.google.longitude,
                minprice: state => state.google.minprice,
                maxprice: state => state.google.maxprice
            }),
            ...mapGetters({
                isSelectedAddressSet: `wizard/isSelectedAddressSet`,
                hasErrors: `wizard/hasErrors`
            }),
            selectedDatasource: {
                get() {
                    return this.$store.state.wizard.selectedDatasource;
                },
                set(value) {
                    this.$store.commit(
                        `wizard/${mutationTypes.UPDATE_SELECTED_DATASOURCE}`,
                        value
                    );
                }
            }
        },
        methods: {
            handleProcessSearch() {
                return new Promise((resolve, reject) => {
                    if (
                        this.selectedDatasource == this.dataSources.google &&
                        this.isSelectedAddressSet
                    ) {
                        this.$store.dispatch(`google/processSearch`, { direction: 0 });
                    } else {
                        reject("missing address");
                        this.$notify({
                            group: "selectedAddressEmpty",
                            title: "Missing address",
                            type: "error",
                            text: "Please enter your address"
                        });
                    }

                    resolve(true);
                });
            },
            handleSelectDataSource(dataSource) {
                this.$store.commit(
                    `wizard/${mutationTypes.UPDATE_SELECTED_DATASOURCE}`,
                    dataSource
                );
            },
            isDataSourcePressed(dataSource) {
                return this.selectedDatasource === dataSource;
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
            handleChangeAddress: function() {
                this.$store.commit(`wizard/${mutationTypes.RESET_SELECTED_ADDRESS}`);
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