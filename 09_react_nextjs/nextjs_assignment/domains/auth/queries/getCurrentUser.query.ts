'use server';
import { createServerClient } from '@/shared/lib/supabase';
import { type UserProfile } from '../types/auth.types';
import { cache } from 'react';

type UserType = UserProfile | null;
export const getCurrentUser = cache(async (): Promise<UserType> => {
    const supabase = createServerClient();

    const {
        data: { user: authUser },
        error: authError,
    } = await supabase.auth.getUser();

    if (authError || !authUser) {
        return null;
    }

    const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', authUser.id)
        .is('deleted_at', null)
        .maybeSingle();

    if (!profile) {
        return null;
    }

    return {
        id: profile.id,
        name: profile.name,
        email: authUser.email,
        createdAt: profile.created_at,
        updatedAt: profile.updated_at,
        deletedAt: profile.deleted_at,
    };
});
