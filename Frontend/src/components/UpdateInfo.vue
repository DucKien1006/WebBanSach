<template>
    <div class="info-wrapper">
        <div class="update-info">
            <h2>Cập nhật thông tin</h2>
            <p>Tên: </p>
            <input v-model="info.fullname" type="text">
            <p>Email: </p>
            <input v-model="info.email" type="text">
            <p>Số điện thoại: </p>
            <input v-model="info.phone" type="text">
            <button @click="updateInfo">Cập nhật</button>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import { updateUser } from '../apis/accountApi'
import { checkPermission } from '../apis/accountApi'
import { useToast } from "vue-toastification";

export default {
    data() {
        return {
            info: {}
        }
    },
    created() {
        this.info = { ...this.logInfo };
    },
    methods: {
        ...mapActions({
            updateUserInfo: 'user/updateUserInfo',
        }),
        async updateInfo() {
            await updateUser(this.info)
                .then(res => {
                    if (res.success) {
                        const toast = useToast();
                        this.updateUserInfo(this.info);
                        toast.success('Cập nhật thông tin thành công', {
                            position: "top-center",
                            showCloseButtonOnHover: true,
                            hideProgressBar: true,
                            closeButton: "button",
                            icon: true,
                            rtl: false,
                        });
                    }
                })
        }
    },
    computed: {
        ...mapState({ logInfo: state => state.user.userInfo })
    },
    watch: {
        logInfo(newVal) {
            this.info = { ...newVal };
        }
    }
}
</script>

<style scoped>
@import url(../css/components/info.css);
</style>