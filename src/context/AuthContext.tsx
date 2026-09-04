import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '@/types';
import { authApi } from '@/lib/api';
import { getUserData } from '@/lib/userStorage';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => Promise<void>;
  register: (data: Record<string, unknown>) => Promise<{ success: boolean; message?: string }>;
  setUser: (user: User | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface DemoAccount {
  user: User;
  password: string;
}

const DEMO_ACCOUNTS: Record<string, DemoAccount> = {
  'member@fitkats.co.za': {
    password: 'Member2026!',
    user: {
      id: 1,
      first_name: 'Lindiwe',
      last_name: 'Mokoena',
      email: 'member@fitkats.co.za',
      role: 'member',
      membership_tier: 'premium',
      joined_at: '2025-02-14',
      avatar_url: '',
    },
  },
  'staff@fitkats.co.za': {
    password: 'Staff2026!',
    user: {
      id: 2,
      first_name: 'Sipho',
      last_name: 'Ndlovu',
      email: 'staff@fitkats.co.za',
      role: 'staff',
      joined_at: '2024-08-01',
      avatar_url: '',
    },
  },
  'manager@fitkats.co.za': {
    password: 'Manager2026!',
    user: {
      id: 3,
      first_name: 'Amara',
      last_name: 'Botha',
      email: 'manager@fitkats.co.za',
      role: 'manager',
      joined_at: '2023-11-20',
      avatar_url: '',
    },
  },
};

const REGISTERED_ACCOUNTS_KEY = 'fitkats_registered_accounts';

interface RegisteredAccount {
  password: string;
  user: User;
}

function getRegisteredAccounts(): Record<string, RegisteredAccount> {
  const stored = localStorage.getItem(REGISTERED_ACCOUNTS_KEY);
  if (!stored) return {};
  try {
    return JSON.parse(stored);
  } catch {
    return {};
  }
}

function saveRegisteredAccount(email: string, account: RegisteredAccount): void {
  const accounts = getRegisteredAccounts();
  accounts[email.toLowerCase()] = account;
  localStorage.setItem(REGISTERED_ACCOUNTS_KEY, JSON.stringify(accounts));
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('fitkats_user');
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        localStorage.removeItem('fitkats_user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail || !password) {
      return { success: false, message: 'Please enter both email and password.' };
    }

    // Try real backend first — only trust it if it actually reached the server
    try {
      const res = await authApi.login(normalizedEmail, password);

      if (res.success && res.data) {
        setUser(res.data as User);
        localStorage.setItem('fitkats_user', JSON.stringify(res.data));
        return { success: true };
      }

      // If the api helper swallowed a network failure, it comes back as this
      // exact message — treat that as "backend unreachable", not a real answer
      if (res.message && res.message.includes('Network error')) {
        throw new Error('backend unreachable');
      }

      // Backend was reached and gave a real answer (e.g. wrong password) — trust it
      return { success: false, message: res.message ?? 'Login failed.' };
    } catch {
      // fall through to local demo/registered accounts below
    }

    const demo = DEMO_ACCOUNTS[normalizedEmail];
    if (demo) {
      if (demo.password !== password) {
        return { success: false, message: 'Incorrect password. Please try again.' };
      }
      setUser(demo.user);
      localStorage.setItem('fitkats_user', JSON.stringify(demo.user));
      return { success: true };
    }

    const registered = getRegisteredAccounts();
    const account = registered[normalizedEmail];
    if (account) {
      if (account.password !== password) {
        return { success: false, message: 'Incorrect password. Please try again.' };
      }
      setUser(account.user);
      localStorage.setItem('fitkats_user', JSON.stringify(account.user));
      return { success: true };
    }

    return { success: false, message: 'No account found with that email. Please register first.' };
  };

  const register = async (data: Record<string, unknown>) => {
    const email = String(data.email ?? '').trim().toLowerCase();
    const password = String(data.password ?? '');

    if (!email || !password) {
      return { success: false, message: 'Email and password are required.' };
    }

    if (DEMO_ACCOUNTS[email] || getRegisteredAccounts()[email]) {
      return { success: false, message: 'An account with this email already exists.' };
    }

    const newUser: User = {
      id: Date.now(),
      first_name: String(data.first_name ?? ''),
      last_name: String(data.last_name ?? ''),
      email,
      role: 'member',
      membership_tier: (data.membership_tier as User['membership_tier']) ?? 'student',
      joined_at: new Date().toISOString().slice(0, 10),
    };

    try {
      const res = await authApi.register(data);

      if (res.message && res.message.includes('Network error')) {
        throw new Error('backend unreachable');
      }

      if (res.success) {
        saveRegisteredAccount(email, { password, user: newUser });
        getUserData(email);
        return { success: true };
      }

      return { success: false, message: res.message ?? 'Registration failed.' };
    } catch {
      // Backend unreachable — save locally so the account still works
      saveRegisteredAccount(email, { password, user: newUser });
      getUserData(email);
      return { success: true };
    }
  };

  const logout = async () => {
    try {
      await authApi.logout();
    } catch {
      // ignore
    }
    setUser(null);
    localStorage.removeItem('fitkats_user');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, register, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}