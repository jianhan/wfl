<template>
    <ul class="list-unstyled" v-if="canShow">
        <b-media tag="li" v-bind:key="index" v-for="(item,index) in googleResults.results ">
            <h5 class="mt-0 mb-1">{{ item.name }}</h5>
            <p>{{ item.vicinity }}</p>
        </b-media>
    </ul>
</template>

<script>
    import bMedia from 'bootstrap-vue/es/components/media/media'
    import bImg from 'bootstrap-vue/es/components/image/img'
    
    export default {
        components: {
            'b-media': bMedia,
            'b-img': bImg,
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
