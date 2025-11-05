'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useUser } from '@clerk/nextjs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { Loader2, MoreHorizontal } from 'lucide-react';

// Your server
const API_BASE = 'https://ai-team-server.onrender.com';

// -------- Types / Catalog --------
type AgentKey =
  | 'JIM' | 'ALEX' | 'MIKE' | 'TONY' | 'LARA' | 'LEIZ' | 'VALENTINA'
  | 'DANIELE' | 'SIMONE' | 'WONDER' | 'NIKO' | 'LEO' | 'LAURA';

type AgentCard = {
  key: AgentKey;
  name: string;
  initials: string;
  color: string; // tailwind gradient
  href: string;
};

const CATALOG: Record<AgentKey, AgentCard> = {
  JIM:       { key: 'JIM',       name: 'Jim AI',       initials: 'JA', color: 'from-blue-500 to-cyan-500',     href: '/dashboard/jim-ai' },
  ALEX:      { key: 'ALEX',      name: 'Alex AI',      initials: 'AA', color: 'from-purple-500 to-pink-500',   href: '/dashboard/alex-ai' },
  MIKE:      { key: 'MIKE',      name: 'Mike AI',      initials: 'MA', color: 'from-orange-500 to-red-500',    href: '/dashboard/mike-ai' },
  TONY:      { key: 'TONY',      name: 'Tony AI',      initials: 'TA', color: 'from-green-500 to-emerald-500', href: '/dashboard/tony-ai' },
  LARA:      { key: 'LARA',      name: 'Lara AI',      initials: 'LA', color: 'from-yellow-500 to-orange-500', href: '/dashboard/lara-ai' },
  LEIZ:      { key: 'LEIZ',      name: 'Leiz AI',      initials: 'LZ', color: 'from-indigo-500 to-purple-500', href: '/dashboard/leiz-ai' },
  VALENTINA: { key: 'VALENTINA', name: 'Valentina AI', initials: 'VA', color: 'from-pink-500 to-rose-500',     href: '/dashboard/valentina-ai' },
  DANIELE:   { key: 'DANIELE',   name: 'Daniele',      initials: 'DA', color: 'from-teal-500 to-cyan-500',     href: '/dashboard/daniele-ai' },
  SIMONE:    { key: 'SIMONE',    name: 'Simone',       initials: 'SI', color: 'from-violet-500 to-purple-500', href: '/dashboard/simone-ai' },
  WONDER:    { key: 'WONDER',    name: 'Wonder',       initials: 'WO', color: 'from-amber-500 to-yellow-500',  href: '/dashboard/wonder-ai' },
  NIKO:      { key: 'NIKO',      name: 'Niko',         initials: 'NI', color: 'from-sky-500 to-blue-500',      href: '/dashboard/niko-ai' },
  LEO:       { key: 'LEO',       name: 'Leo',          initials: 'LE', color: 'from-emerald-500 to-green-500', href: '/dashboard/leo-ai' },
  LAURA:     { key: 'LAURA',     name: 'Laura',        initials: 'LU', color: 'from-rose-500 to-pink-500',     href: '/dashboard/laura-ai' },
};

export default function AITeamPage() {
  const { isLoaded, isSignedIn, user } = useUser();

  // Prefer primary email; if absent, use first email address
  const email = useMemo(() => {
    if (!isLoaded || !isSignedIn) return '';
    return (
      user?.primaryEmailAddress?.emailAddress ||
      user?.emailAddresses?.[0]?.emailAddress ||
      ''
    ).trim();
  }, [isLoaded, isSignedIn, user]);

  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState('');
  const [selected, setSelected] = useState<AgentKey[]>([]);

  useEffect(() => {
    if (!isLoaded) return;

    if (!isSignedIn) {
      setLoading(false);
      setError('You must be signed in to view your agents.');
      return;
    }
    if (!email) {
      setLoading(false);
      setError('No email found on your profile.');
      return;
    }

    const ctrl = new AbortController();
    setLoading(true);
    setError('');

    (async () => {
      try {
        const url = `${API_BASE}/users/email/${encodeURIComponent(email)}/agents`;
        const res = await fetch(url, { signal: ctrl.signal, cache: 'no-store' });
        if (!res.ok) throw new Error((await res.text()) || `Request failed (${res.status})`);

        const data: string[] = await res.json();
        const validKeys = Object.keys(CATALOG) as AgentKey[];

        const normalized = (data ?? [])
          .map(s => String(s).toUpperCase().trim())
          .filter((s): s is AgentKey => (validKeys as string[]).includes(s));

        setSelected(normalized);
      } catch (e: any) {
        if (e.name !== 'AbortError') setError(e?.message || 'Failed to fetch selected agents');
      } finally {
        setLoading(false);
      }
    })();

    return () => ctrl.abort();
  }, [isLoaded, isSignedIn, email]);

  const cards = useMemo(() => selected.map(k => CATALOG[k]).filter(Boolean), [selected]);

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="mx-auto max-w-7xl">
        <header className="mb-6">
          <h1 className="text-xl font-semibold text-gray-900">AI Agent Team</h1>
          {email && (
            <p className="text-sm text-gray-500">
              Showing agents selected for <span className="font-medium">{email}</span>
            </p>
          )}
        </header>

        {!isLoaded && (
          <div className="flex items-center gap-2 text-gray-600">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Loading…</span>
          </div>
        )}

        {isLoaded && loading && (
          <div className="flex items-center gap-2 text-gray-600">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Loading selected agents…</span>
          </div>
        )}

        {isLoaded && !loading && error && (
          <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {isLoaded && !loading && !error && cards.length === 0 && (
          <div className="rounded-md border border-gray-200 bg-gray-50 p-4 text-gray-600">
            No agents selected for this user.
          </div>
        )}

        {isLoaded && !loading && !error && cards.length > 0 && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {cards.map(agent => (
              <Link key={agent.key} href={agent.href}>
                <Card className="group relative flex items-center gap-4 border-gray-200 bg-white p-4 transition-all hover:border-gray-300 hover:bg-gray-50 cursor-pointer">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className={`bg-gradient-to-br ${agent.color} text-white font-semibold`}>
                      {agent.initials}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1">
                    <h3 className="font-medium text-black">{agent.name}</h3>
                  </div>

                  <button className="opacity-0 transition-opacity group-hover:opacity-100" aria-label="More">
                    <MoreHorizontal className="h-5 w-5 text-gray-600" />
                  </button>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
