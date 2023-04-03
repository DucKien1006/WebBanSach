<template>
    <div class="main-layout-wrapper">
        <TheHeader />
        <router-view></router-view>
        <TheFooter />
    </div>
</template>

<script>
import TheHeader from '../components/TheHeader.vue';
import TheFooter from '../components/TheFooter.vue';
import TheContent from '../components/TheContent.vue';

export default {
    name: 'TheLayout',
    components: {
        TheHeader,
        TheContent,
        TheFooter
    },
    created() {
        console.log("The Layout created.");
    }
}
</script>

<style>
@import url(../css/layout.css);
</style>