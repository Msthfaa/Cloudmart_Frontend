import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '../views/seller/Login.vue';
import RegisterView from '../views/seller/Register.vue';
import DashboardView from '../views/seller/Dashboard.vue';
// JANGAN LUPA IMPORT INI
import ProductsView from '../views/seller/Product.vue'; 
import OrderView from '../views/seller/Order.vue'; 
import TokoView from '../views/seller/SettingToko.vue'; 
import AddProdut from '../views/seller/AddProduct.vue'; 

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', name: 'Login', component: LoginView },
  { path: '/register', name: 'Register', component: RegisterView },
  {
    path: '/admin',
        component: () => import('../AdminLayout.vue'), 
    // meta: { requiresAuth: true }, 
    children: [
      { 
        path: 'dashboard', 
        name: 'AdminDashboard', 
        component: DashboardView 
      },
      { 
        path: 'products', 
        name: 'AdminProducts', 
        component: ProductsView
      },
      { 
        path: 'orders', 
        name: 'AdminOrders', 
        component: OrderView
      },
      { 
        path: 'setting', 
        name: 'settingToko', 
        component: TokoView
      },
      {
        path: '/admin/products/add',
        name: 'AddProduct',
        component: AddProdut
      }
    ]
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('token');
  
  // Cek apakah rute yang dituju (atau parent-nya) butuh auth
  if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
    next('/login');
  } else {
    next();
  }
});

export default router;