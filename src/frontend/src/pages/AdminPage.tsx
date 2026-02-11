import { useState, useEffect } from 'react';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useActor } from '../hooks/useActor';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Lock } from 'lucide-react';
import AdminDashboard from '../admin/AdminDashboard';
import { getSecretParameter, storeSessionParameter, clearSessionParameter } from '../utils/urlParams';

export default function AdminPage() {
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);

  const { identity, login, clear, loginStatus, isLoggingIn } = useInternetIdentity();
  const { actor, isFetching: actorFetching } = useActor();

  // Check if admin token exists in session
  useEffect(() => {
    const existingToken = getSecretParameter('caffeineAdminToken');
    if (existingToken) {
      setIsUnlocked(true);
    }
  }, []);

  // Check if user is admin
  const {
    data: isAdmin,
    isLoading: isCheckingAdmin,
    error: adminCheckError,
  } = useQuery({
    queryKey: ['isAdmin', identity?.getPrincipal().toString()],
    queryFn: async () => {
      if (!actor || !identity) return false;
      try {
        return await actor.isCallerAdmin();
      } catch (error) {
        console.error('Admin check error:', error);
        return false;
      }
    },
    enabled: !!actor && !!identity && !actorFetching && isUnlocked,
    retry: false,
  });

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError('');

    if (!password.trim()) {
      setPasswordError('Please enter the admin password');
      return;
    }

    // Store the password as admin token
    storeSessionParameter('caffeineAdminToken', password);
    setIsUnlocked(true);
    setPassword('');
  };

  const handleLogout = async () => {
    clearSessionParameter('caffeineAdminToken');
    setIsUnlocked(false);
    await clear();
  };

  // Show password prompt if not unlocked
  if (!isUnlocked) {
    return (
      <div className="container py-12">
        <div className="max-w-md mx-auto">
          <Card>
            <CardHeader className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Lock className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-2xl">Admin Access</CardTitle>
              <CardDescription>Enter the admin password to continue</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePasswordSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="password">Admin Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter admin password"
                    autoFocus
                  />
                </div>

                {passwordError && (
                  <Alert variant="destructive">
                    <AlertDescription>{passwordError}</AlertDescription>
                  </Alert>
                )}

                <Button type="submit" className="w-full">
                  Unlock Admin Panel
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Show login prompt if not authenticated
  if (!identity) {
    return (
      <div className="container py-12">
        <div className="max-w-md mx-auto">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Authentication Required</CardTitle>
              <CardDescription>Please log in to access the admin panel</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button onClick={login} disabled={isLoggingIn} className="w-full" size="lg">
                {isLoggingIn ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Logging in...
                  </>
                ) : (
                  'Login with Internet Identity'
                )}
              </Button>
              <Button onClick={handleLogout} variant="outline" className="w-full">
                Back to Password
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Show loading while checking admin status
  if (actorFetching || isCheckingAdmin) {
    return (
      <div className="container py-12">
        <div className="max-w-md mx-auto">
          <Card>
            <CardContent className="py-12 text-center">
              <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
              <p className="text-muted-foreground">Verifying admin access...</p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Show error if admin check failed
  if (adminCheckError || isAdmin === false) {
    return (
      <div className="container py-12">
        <div className="max-w-md mx-auto">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Access Denied</CardTitle>
              <CardDescription>You do not have admin privileges</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert variant="destructive">
                <AlertDescription>
                  {adminCheckError
                    ? 'Failed to verify admin access. The password may be incorrect.'
                    : 'Your account does not have admin privileges.'}
                </AlertDescription>
              </Alert>
              <Button onClick={handleLogout} variant="outline" className="w-full">
                Logout
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Show admin dashboard if authenticated and authorized
  return <AdminDashboard onLogout={handleLogout} />;
}
