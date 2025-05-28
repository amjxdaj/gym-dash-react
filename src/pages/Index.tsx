
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from '../contexts/AuthContext';
import LandingPage from '../components/LandingPage';
import LoginPage from '../components/auth/LoginPage';
import SignupPage from '../components/auth/SignupPage';
import OwnerDashboard from '../components/owner/OwnerDashboard';
import AdminDashboard from '../components/admin/AdminDashboard';
import MemberDashboard from '../components/member/MemberDashboard';
import MemberManagement from '../components/admin/MemberManagement';
import AddEditMember from '../components/admin/AddEditMember';
import AttendancePage from '../components/admin/AttendancePage';
import ExpensesPage from '../components/admin/ExpensesPage';
import ReportsPage from '../components/admin/ReportsPage';
import PosterGenerator from '../components/admin/PosterGenerator';
import BodyTracker from '../components/member/BodyTracker';
import NotFound from './NotFound';

const ProtectedRoute = ({ children, allowedRoles }: { children: React.ReactNode, allowedRoles: string[] }) => {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

const AppRoutes = () => {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/" element={user ? <Navigate to={`/${user.role}-dashboard`} replace /> : <LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      
      {/* Owner Routes */}
      <Route 
        path="/owner-dashboard" 
        element={
          <ProtectedRoute allowedRoles={['owner']}>
            <OwnerDashboard />
          </ProtectedRoute>
        } 
      />
      
      {/* Admin Routes */}
      <Route 
        path="/admin-dashboard" 
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminDashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/members" 
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <MemberManagement />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/members/add" 
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AddEditMember />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/members/edit/:id" 
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AddEditMember />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/attendance" 
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AttendancePage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/expenses" 
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <ExpensesPage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/reports" 
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <ReportsPage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/poster-generator" 
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <PosterGenerator />
          </ProtectedRoute>
        } 
      />
      
      {/* Member Routes */}
      <Route 
        path="/member-dashboard" 
        element={
          <ProtectedRoute allowedRoles={['member']}>
            <MemberDashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/body-tracker" 
        element={
          <ProtectedRoute allowedRoles={['member']}>
            <BodyTracker />
          </ProtectedRoute>
        } 
      />
      
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const Index = () => {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-50">
        <AppRoutes />
      </div>
    </AuthProvider>
  );
};

export default Index;
