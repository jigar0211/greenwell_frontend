import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { toast } from '@/hooks/use-toast';
import { accountLogin, accountLogout, getAuthUser } from '@/services/api';
import { queryKeys } from '@/lib/queryKeys';

export interface LoginCredentials {
    mobile: string;
    password: string;
}

export interface User {
    id: string;
    first_name: string;
    email?: string;
    mobile: string;
    role: string;
}

export interface LoginResponse {
    token_type: 'access';
    token: string;
    expires_in: string;
    user: User;
}

// Hook to get current user
export function useUser() {
    return useQuery({
        queryKey: queryKeys.auth.user(),
        queryFn: getAuthUser,
        retry: false,
        staleTime: 5 * 60 * 1000, // 5 minutes
        enabled: !!Cookies.get('auth_token'),
    });
}

// Hook to login
export function useLogin() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (credentials: LoginCredentials) => accountLogin(credentials),
        onSuccess: (data: LoginResponse) => {
            // Store token in cookie (7 days expiry)
            Cookies.set('auth_token', data.token, { expires: 7 });

            // Store user in cookie
            Cookies.set('user_details', JSON.stringify(data.user), { expires: 7 });

            // Set user in cache
            queryClient.setQueryData(queryKeys.auth.user(), data.user);

            toast({
                title: 'Welcome back!',
                description: `Logged in as ${data.user.first_name || 'User'}`
            });

            // Use window.location to avoid Router context issue
            window.location.href = '/';
        },
        onError: (error: any) => {
            if (error.details?.process_code === 'user_already_logged_in') {
                return; // Let the component handle it
            }
            const message = error?.message || 'Login failed. Please check your credentials.';
            toast({ title: 'Error', description: message, variant: 'destructive' });
        },
    });
}

// Hook to logout
export function useLogout() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: accountLogout,
        onSettled: () => {
            // Clear cookies and cache regardless of API success/failure
            Cookies.remove('auth_token');
            Cookies.remove('user_details');
            queryClient.clear();

            toast({ title: 'Logged out', description: 'You have been logged out successfully' });

            // Redirect to login page
            window.location.href = '/login';
        },
    });
}

// Hook to check if user is authenticated
export function useIsAuthenticated() {
    const { data: user, isLoading } = useUser();
    return {
        isAuthenticated: !!user,
        isLoading,
    };
}
