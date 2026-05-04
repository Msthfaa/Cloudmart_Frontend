import { createRouter, createWebHistory } from 'vue-router';

// ===================== LAYOUTS =====================
import PublicLayout from '../layouts/PublicLayout.vue';
import AdminLayout from '../layouts/AdminLayout.vue';

// ===================== PUBLIC / BUYER VIEWS =====================
import HomeView from '../views/buyer/HomeView.vue';
import CategoryView from '../views/buyer/CategoryView.vue';
import ProductDetail from '../views/buyer/ProductDetail.vue';
import CheckoutView from '../views/buyer/CheckoutView.vue';
import PaymentSuccess from '../views/buyer/PaymentSuccess.vue';
import CartView from '../views/buyer/CartView.vue';
import OrdersView from '../views/buyer/OrdersView.vue';

// ===================== AUTH VIEWS =====================
import LoginView from '../views/auth/Login.vue';
import RegisterView from '../views/auth/Register.vue';
import AdminLoginView from '../views/auth/AdminLogin.vue';

// ===================== SELLER / ADMIN VIEWS =====================
import DashboardView from '../views/seller/Dashboard.vue';
import ProductsView from '../views/seller/Product.vue';
import OrderView from '../views/seller/Order.vue';
import TokoView from '../views/seller/SettingToko.vue';
import AddProduct from '../views/seller/AddProduct.vue';

const routes = [
  // ── AREA PUBLIC (Buyer / Toko Depan) ──────────────────────────
  {
    path: '/',
    component: PublicLayout,
    children: [
      { path: '', name: 'Home', component: HomeView },
      { path: 'category/:slug',  name: 'Category',       component: CategoryView },
      { path: 'product/:id',     name: 'ProductDetail',  component: ProductDetail },
      { path: 'payment-success', name: 'PaymentSuccess', component: PaymentSuccess },
      { path: 'cart',            name: 'Cart',           component: CartView,       meta: { requiresBuyer: true } },
      { path: 'orders',          name: 'Orders',         component: OrdersView,     meta: { requiresBuyer: true } },
    ],
  },

  // ── AREA AUTH (User) ──────────────────────────────────────────
  { path: '/login',    name: 'Login',    component: LoginView },
  { path: '/register', name: 'Register', component: RegisterView },

  // ── CHECKOUT — standalone layout (no navbar/footer) ──────────
  { path: '/checkout', name: 'Checkout', component: CheckoutView, meta: { requiresBuyer: true } },

  // ── AREA AUTH (Admin — akses manual via URL) ──────────────────
  { path: '/admin/login', name: 'AdminLogin', component: AdminLoginView },

  // ── AREA ADMIN / SELLER (Butuh token) ───────────────────────
  {
    path: '/admin',
    component: AdminLayout,
    meta: { requiresAuth: true },
    children: [
      { path: 'dashboard',    name: 'AdminDashboard', component: DashboardView },
      { path: 'products',     name: 'AdminProducts',  component: ProductsView },
      { path: 'products/add', name: 'AddProduct',     component: AddProduct },
      { path: 'orders',       name: 'AdminOrders',    component: OrderView },
      { path: 'setting',      name: 'settingToko',    component: TokoView },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  // Scroll ke atas saat pindah halaman
  scrollBehavior: () => ({ top: 0, behavior: 'smooth' }),
});

// ===================== ROUTE GUARD =====================
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('access_token');

  // Admin routes — butuh token
  if (to.matched.some(record => record.meta.requiresAuth) && !token) {
    next('/admin/login');
  }
  // Buyer routes — butuh login
  else if (to.matched.some(record => record.meta.requiresBuyer) && !token) {
    next('/login');
  }
  // Sudah login, coba akses halaman login admin → lempar ke dashboard
  else if (to.name === 'AdminLogin' && token) {
    next('/admin/dashboard');
  }
  else {
    next();
  }
});

export default router;