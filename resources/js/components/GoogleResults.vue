<template>
    <ul class="list-unstyled" v-if="canShow">
        <b-media tag="li" v-bind:key="index" v-for="(item,index) in googleResults.results ">
            <b-img slot="aside" :src="item.icon" blank-color="#abc" width="64" alt="placeholder" v-if="item.icon"/>
            <h4 class="mt-0 mb-1">{{ item.name }}</h4>
            <p>{{ item.vicinity }}</p>
            <b-badge class="mr-1" pill variant="secondary" v-bind:key="tIndex" v-for="(tValue,tIndex) in item.types" v-html="tValue"></b-badge>
        </b-media>
    </ul>
</template>

<script>
    import bMedia from 'bootstrap-vue/es/components/media/media'
    import bImg from 'bootstrap-vue/es/components/image/img'
    import bBadge from 'bootstrap-vue/es/components/badge/badge'
    
    export default {
        components: {
            'b-media': bMedia,
            'b-img': bImg,
            'b-badge': bBadge,
        },
        props: {
            googleResults: {
                type: Object,
                default: function() {
                    return {
                        html_attributions: [],
                        results: []
                    }
                }
            }
        },
        computed: {
            canShow: function() {
                if (_.isNull(this.googleResults)) {
                    return false
                }
    
                if (_.get(this.googleResults, 'results', []).length === 0) {
                    return false
                }
    
                return true
            }
        }
    }
</script>
