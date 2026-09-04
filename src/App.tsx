import { Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from '@/pages/LandingPage';
import AboutPage from '@/pages/AboutPage';
import MembershipsPage from '@/pages/MembershipsPage';
import PricingPage from '@/pages/PricingPage';
import RegisterPage from '@/pages/RegisterPage';
import LoginPage from '@/pages/LoginPage';
import ForgotPasswordPage from '@/pages/ForgotPasswordPage';
import ContactPage from '@/pages/ContactPage';
import MemberDashboard from '@/pages/dashboard/MemberDashboard';
import StaffDashboard from '@/pages/dashboard/StaffDashboard';
import ManagerDashboard from '@/pages/dashboard/ManagerDashboard';
import ProfilePage from '@/pages/dashboard/ProfilePage';
import ClassesPage from '@/pages/dashboard/ClassesPage';
import BookingsPage from '@/pages/dashboard/BookingsPage';
import PaymentsPage from '@/pages/dashboard/PaymentsPage';
import WorkoutProgressPage from '@/pages/dashboard/WorkoutProgressPage';
import RewardsPage from '@/pages/dashboard/RewardsPage';
import SettingsPage from '@/pages/dashboard/SettingsPage';
import OnboardingPlanPage from '@/pages/dashboard/OnboardingPlanPage';
import MembersPage from '@/pages/dashboard/MembersPage';
import ClassManagementPage from '@/pages/dashboard/ClassManagementPage';
import PerkFulfilmentPage from '@/pages/dashboard/PerkFulfilmentPage';
import MaintenancePage from '@/pages/dashboard/MaintenancePage';
import AnnouncementsPage from '@/pages/dashboard/AnnouncementsPage';
import ReportsPage from '@/pages/dashboard/ReportsPage';
import StaffManagementPage from '@/pages/dashboard/StaffManagementPage';
import { useAuth } from '@/context/AuthContext';
import { getUserData } from '@/lib/userStorage';

function RoleDashboard() {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;

  if (user.role === 'member') {
    const data = getUserData(user.email);
    if (!data.hasCompletedOnboarding) {
      return <Navigate to="/dashboard/setup-plan" replace />;
    }
  }

  if (user.role === 'staff') return <StaffDashboard />;
  if (user.role === 'manager') return <ManagerDashboard />;
  return <MemberDashboard />;
}

function RequireRole({ roles, children }: { roles: string[]; children: JSX.Element }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (!roles.includes(user.role)) return <Navigate to="/dashboard" replace />;
  return children;
}

function App() {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-base-950 flex items-center justify-center">
        <div className="w-10 h-10 rounded-full border-2 border-base-700 border-t-accent animate-spin" />
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/memberships" element={<MembershipsPage />} />
      <Route path="/pricing" element={<PricingPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/contact" element={<ContactPage />} />

      <Route path="/dashboard" element={<RoleDashboard />} />
      <Route path="/dashboard/setup-plan" element={<OnboardingPlanPage />} />
      <Route path="/dashboard/profile" element={<ProfilePage />} />
      <Route path="/dashboard/classes" element={<ClassesPage />} />
      <Route path="/dashboard/bookings" element={<BookingsPage />} />
      <Route path="/dashboard/payments" element={<PaymentsPage />} />
      <Route path="/dashboard/workout-progress" element={<WorkoutProgressPage />} />
      <Route path="/dashboard/rewards" element={<RewardsPage />} />
      <Route path="/dashboard/settings" element={<SettingsPage />} />

      <Route
        path="/dashboard/members"
        element={<RequireRole roles={['staff', 'manager']}><MembersPage /></RequireRole>}
      />
      <Route
        path="/dashboard/manage-classes"
        element={<RequireRole roles={['staff', 'manager']}><ClassManagementPage /></RequireRole>}
      />
      <Route
        path="/dashboard/maintenance"
        element={<RequireRole roles={['staff', 'manager']}><MaintenancePage /></RequireRole>}
      />
      <Route
        path="/dashboard/announcements"
        element={<RequireRole roles={['staff', 'manager']}><AnnouncementsPage /></RequireRole>}
      />
      <Route
        path="/dashboard/perks"
        element={<RequireRole roles={['staff']}><PerkFulfilmentPage /></RequireRole>}
      />
      <Route
        path="/dashboard/reports"
        element={<RequireRole roles={['manager']}><ReportsPage /></RequireRole>}
      />
      <Route
        path="/dashboard/staff"
        element={<RequireRole roles={['manager']}><StaffManagementPage /></RequireRole>}
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;