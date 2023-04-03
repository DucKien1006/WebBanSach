<template>
    <div>
        <Paginate
            :page-count="20"
            :page-range="3"
            :click-handler="choosePage"
            :prev-text="'Trước'"
            :next-text="'Sau'"
        />
    </div>
</template>

<script>
import Paginate from "vuejs-paginate-next";

export default {
    components: {
        Paginate
    },
    methods: {
        choosePage() {
        }
    }
}
</script>

<style>
@import url(../css/components/pagination.css);
</style>