import { createRouter, createWebHistory} from 'vue-router'
import TheLayout from '../views/TheLayout.vue'
import ProductDetail from '../components/ProductDetail.vue'
import TheAdminPage from '../views/TheAdminPage.vue'
import TheDashBoard from '../views/admin/TheDashboard.vue'
import TheContent from '../components/TheContent.vue'
import TheLogin from '../components/TheLogin.vue'
import TheCart from '../components/TheCart.vue'
import HistoryOrder from '../components/HistoryOrder.vue'
import UpdateInfo from '../components/UpdateInfo.vue'
import TheRegister from '../components/TheRegister.vue'

import TheManageUser from '../components/tables/TheManageUser.vue'
import TheManageProduct from '../components/tables/TheManageProduct.vue'
import TheManageOrder from '../components/tables/TheManageOrder.vue'
import TheManagePromotion from '../components/tables/TheManagePromotion.vue'
import TheManageCategory from '../components/tables/TheManageCategory.vue'
const routes = [
    {
        path: '/',
        name: 'Home',
        component: TheLayout,
        children: [
            {
              path: '',
              name: 'Content',
              component: TheContent,
              name: 'Content'
            },
            {
              path: 'detail',
              name: 'Detail',
              component: ProductDetail,
            },
            {
              path: 'cart',
              name: 'Cart',
              component: TheCart,
            },
            {
              path: 'history',
              name: 'History',
              component: HistoryOrder,
            },
            {
              path: 'info',
              name: 'ChangeInfo',
              component: UpdateInfo,
            }
          ],
    },
    {
        path: '/admin',
        name: 'Admin',
        component: TheAdminPage,
        children: [
            {
                path: '/dashboard',
                name: 'Dashboard',
                component: TheDashBoard,
            }, 
            {
                path: '/manageproduct',
                name: 'ManageProduct',
                component: TheManageProduct,
            },
            {
                path: '/manageuser',
                name: 'ManageUser',
                component: TheManageUser,
            },
            {
              path: '/manageorder',
              name: 'ManageOrder',
              component: TheManageOrder,
          },
          {
            path: '/managepromotion',
            name: 'ManagePromotion',
            component: TheManagePromotion,
          },
          {
            path: '/managecategory',
            name: 'ManageCategory',
            component: TheManageCategory,
          },
        ]
    },
    {
      path: '/login',
      name: 'Login',
      component: TheLogin
    },
    {
      path: '/register',
      name: 'Register',
      component: TheRegister
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;