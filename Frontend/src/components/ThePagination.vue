<template>
    <div>
        <Paginate
            v-model="page"
            :page-count="pageCount"
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
    props: ['pageCount'],
    data() {
        return {
            page: 1,
        }
    },
    methods: {
        choosePage(page) {
            this.$emit('choosePage', page);   
        },
        chooseFirstPage() {
            this.page = 1;
        }
    }
}
</script>

<style>
@import url(../css/components/pagination.css);
</style>