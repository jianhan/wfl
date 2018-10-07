<template>
    <div>
        <b-form @submit="handleSubmit" @reset="handleReset">
    
            <b-form-group description="Enter your current address as starting location" label="Address" label-for="location">
                <gmap-autocomplete @place_changed="setPlace" class="form-control"></gmap-autocomplete>
            </b-form-group>
    
            <b-form-group label="Radius" description="Searching radius defines the distance (in meters) within which will search be performed">
                <b-form-radio-group buttons button-variant="outline-primary" size="md" v-model="form.radius" :options="radiusOptions" />
            </b-form-group>
    
    
            <b-card-group deck>
                <b-card img-src="images/zomato.svg" img-alt="Img" img-top class="text-center border-info">
                    <div slot="footer">
                        <h5>Zomato</h5>
                    </div>
                </b-card>
                <b-card img-src="images/google.svg" img-alt="Img" img-top class="text-center">
                    <div slot="footer">
                        <h5>Google</h5>
                    </div>
                </b-card>
                <b-card img-src="images/here.svg" img-alt="Img" img-top class="text-center">
                    <div slot="footer">
                        <h5>Here</h5>
                    </div>
                </b-card>
                <b-card img-src="images/yelp.svg" img-alt="Img" img-top class="text-center">
                    <div slot="footer">
                        <h5>Yelp</h5>
                    </div>
                </b-card>
            </b-card-group>
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
    import bFormRadioGroup from 'bootstrap-vue/es/components/form-radio/form-radio-group'
    import bCard from 'bootstrap-vue/es/components/card/card'
    import bCardGroup from 'bootstrap-vue/es/components/card/card-group'
    
    export default {
        components: {
            'b-form': bForm,
            'b-form-group': bFormGroup,
            'b-button': bButton,
            'b-form-input': bFormInput,
            'b-form-select': bFormSelect,
            'b-form-checkbox': bFormCheckbox,
            'b-form-checkbox-group': bFormCheckboxGroup,
            'b-form-radio-group': bFormRadioGroup,
            'b-card': bCard,
            'b-card-group': bCardGroup,
        },
        data() {
            return {
                place: null,
                form: {
                    latitude: '',
                    longitude: '',
                    radius: 500
                },
                radiusOptions: [{
                        text: '500m',
                        value: 500
                    },
                    {
                        text: '1000m',
                        value: 1000
                    },
                    {
                        text: '2000m',
                        value: 2000
                    },
                    {
                        text: '5000m',
                        value: 5000
                    },
                ]
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