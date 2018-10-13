<template>
    <ul class="list-unstyled" v-if="canShow">
        <b-media tag="li">
            <b-img slot="aside" blank blank-color="#abc" width="64" alt="placeholder" />
            <h5 class="mt-0 mb-1">List-based media object</h5>
            Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
        </b-media>
        <b-media tag="li" class="my-4">
            <b-img slot="aside" blank blank-color="#cba" width="64" alt="placeholder" />
            <h5 class="mt-0 mb-1">List-based media object</h5>
            Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
        </b-media>
        <b-media tag="li">
            <b-img slot="aside" blank blank-color="#bac" width="64" alt="placeholder" />
            <h5 class="mt-0 mb-1">List-based media object</h5>
            Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
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
