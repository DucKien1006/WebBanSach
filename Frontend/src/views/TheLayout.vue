<template>
    <div class="main-layout-wrapper">
        <TheHeader />
        <router-view></router-view>
        <TheLoading v-if="isLoading"/>
        <TheFooter />
    </div>
</template>

<script>
import TheHeader from '../components/TheHeader.vue';
import TheFooter from '../components/TheFooter.vue';
import TheContent from '../components/TheContent.vue';
import TheLoading from '../components/TheLoading.vue';
import { mapState } from 'vuex';

export default {
    name: 'TheLayout',
    components: {
    TheHeader,
    TheContent,
    TheFooter,
    TheLoading
},
    created() {
        // console.log("The Layout created.");
    },
    computed: {
        ...mapState({ isLoading: state => state.loading.isLoading }),
    }
    
}
</script>

<style>
@import url(../css/layout.css);
</style>