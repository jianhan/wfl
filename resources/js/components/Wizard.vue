<template>
    <form-wizard title="Restaurant Search Wizard" subtitle="Please complete the steps below to search results">
        <tab-content title="Select Datasource">
            My first tab content
        </tab-content>
        <tab-content title="Extra Options">
            My second tab content
        </tab-content>
        <tab-content title="Results">
            Yuhuuu! This seems pretty damn simple
        </tab-content>
    </form-wizard>
</template>

<script>
    import {
        FormWizard,
        TabContent
    } from 'vue-form-wizard'
    import 'vue-form-wizard/dist/vue-form-wizard.min.css'
    
    export default {
        components: {
            FormWizard,
            TabContent
        }
    }
</script>