import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import AppLayout from './layouts/AppLayout';
import AdminLayout from './layouts/AdminLayout';

// Core Pages
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Orders from './pages/Orders';
import Products from './pages/Products';
import ProductEditor from './pages/ProductEditor';
import AIGrowth from './pages/AIGrowth';

// Secondary Modules
import BrandSetup from './pages/BrandSetup';
import Marketplaces from './pages/Marketplaces';
import Shipping from './pages/Shipping';
import Invoice from './pages/Invoice';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';
import Notifications from './pages/Notifications';
import HelpCenter from './pages/HelpCenter'; // Added HelpCenter
import Referrals from './pages/Referrals';
import CompetitorXRay from './pages/CompetitorXRay';
import PurchaseOrders from './pages/PurchaseOrders';
import VIPBlackBook from './pages/VIPBlackBook';

// Admin Pages
import AdminOverview from './pages/AdminOverview';
import AdminTenants from './pages/AdminTenants';
import AdminCustomers from './pages/AdminCustomers';
import AdminUserManagement from './pages/AdminUserManagement';
import AdminBroadcasts from './pages/AdminBroadcasts';
import AdminHealth from './pages/AdminHealth';
import AdminRevenue from './pages/AdminRevenue';
import AdminBackups from './pages/AdminBackups';
import AdminSettings from './pages/AdminSettings';
import AdminAuditLogs from './pages/AdminAuditLogs';

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<Login />} />

            {/* Main User App Routes */}
            <Route element={<AppLayout />}>
              {/* The Daily 5 */}
              <Route path="/" element={<Dashboard />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:id" element={<ProductEditor />} />
              <Route path="/ai" element={<AIGrowth />} />

              {/* Secondary Modules */}
              <Route path="/marketplaces" element={<Marketplaces />} />
              <Route path="/competitors" element={<CompetitorXRay />} />
              <Route path="/vip-customers" element={<VIPBlackBook />} />
              <Route path="/purchase-orders" element={<PurchaseOrders />} />
              <Route path="/shipping" element={<Shipping />} />
              <Route path="/invoice" element={<Invoice />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/help" element={<HelpCenter />} /> {/* Added Help Route */}
              <Route path="/referrals" element={<Referrals />} />
            </Route>

            {/* Super Admin Routes */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminOverview />} />
              <Route path="tenants" element={<AdminTenants />} />
              <Route path="customers" element={<AdminCustomers />} />
              <Route path="users" element={<AdminUserManagement />} />
              <Route path="broadcasts" element={<AdminBroadcasts />} />
              <Route path="health" element={<AdminHealth />} />
              <Route path="revenue" element={<AdminRevenue />} />
              <Route path="backups" element={<AdminBackups />} />
              <Route path="settings" element={<AdminSettings />} />
              <Route path="logs" element={<AdminAuditLogs />} />
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}
