import { createRouter, createWebHistory} from 'vue-router'
import TheLayout from '../views/TheLayout.vue'
import ProductDetail from '../components/ProductDetail.vue'
import TheAdminPage from '../views/TheAdminPage.vue'
import TheDashBoard from '../views/admin/TheDashBoard.vue'
import TheContent from '../components/TheContent.vue'
import TheLogin from '../components/TheLogin.vue'
import TheCart from '../components/TheCart.vue'

import TheManageUser from '../components/tables/TheManageUser.vue'
import TheManageProduct from '../components/tables/TheManageProduct.vue'
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
                path: '/manageuser',
                name: 'ManageUser',
                component: TheManageUser,
            },
            {
                path: '/manageproduct',
                name: 'ManageProduct',
                component: TheManageProduct,
            },
        ]
    },
    {
      path: '/login',
      name: 'Login',
      component: TheLogin
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;