<template>
    <div>
    
        <ul class="list-unstyled" v-if="canShow">
            <b-media tag="li" v-bind:key="index" v-for="(item,index) in restaurants ">
                <b-img slot="aside" :src="item.icon" width="30" height="30" v-if="item.icon" />
                <h5 class="mt-0 mb-1">{{ item.name }}</h5>
                <star-rating v-if="item.rating > 0" v-bind:read-only="true" v-model="item.rating" v-bind:increment="0.1" v-bind:max-rating="5" v-bind:star-size="15"></star-rating>
                <p>{{ item.vicinity }}</p>
                <b-badge class="mr-1" pill variant="secondary" v-bind:key="tIndex" v-for="(tValue,tIndex) in item.types" v-html="tValue"></b-badge>
            </b-media>
        </ul>
    
        <div class="d-flex justify-content-center">
            <b-button @click="handleNextPageClicked" v-if="siblingPageToken(-1)" variant="outline-primary">Previous</b-button>
            <b-button @click="handleNextPageClicked" v-if="siblingPageToken(1)" variant="outline-primary">Next</b-button>
        </div>
    
    </div>
</template>

<script>
    import bMedia from 'bootstrap-vue/es/components/media/media'
    import bImg from 'bootstrap-vue/es/components/image/img'
    import bButton from "bootstrap-vue/es/components/button/button";
    import bBadge from 'bootstrap-vue/es/components/badge/badge'
    import StarRating from 'vue-star-rating'
    import {
        mapGetters,
        mapState
    } from "vuex";
    
    export default {
        name: 'google-results',
        components: {
            'b-media': bMedia,
            'b-img': bImg,
            'b-badge': bBadge,
            'star-rating': StarRating,
            'b-button': bButton,
        },
        computed: {
            ...mapState({
    
                // wizard
                isLoading: state => state.wizard.isLoading,
                selectedAddress: state => state.wizard.selectedAddress,
                selectedDatasource: state => state.wizard.selectedDatasource,
                dataSources: state => state.wizard.dataSources,
    
                // google
                restaurants: state => state.google.restaurants,
                pagetoken: state => state.google.pagetoken,
            }),
            ...mapGetters({
                // wizard
                isSelectedAddressSet: `wizard/isSelectedAddressSet`,

                //  google
                hasRestaurants: `google/hasRestaurants`,
                siblingPageToken: `google/siblingPageToken`,
            }),
            canShow() {
                return this.selectedDatasource == this.dataSources.google && this.hasRestaurants
            }
        },
        methods: {
            handleNextPageClicked() {
                if (
                    this.selectedDatasource == this.dataSources.google &&
                    this.isSelectedAddressSet
                ) {
                    this.$store.dispatch(`wizard/processSearch`, { direction: 1 });
                } else {
                    reject("missing address");
                    this.$notify({
                        group: "selectedAddressEmpty",
                        title: "Missing address",
                        type: "error",
                        text: "Please enter your address"
                    });
                }
            }
        }
    }
</script>
