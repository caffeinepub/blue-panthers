import { Users, Mail, Shield, Clock, RefreshCw } from 'lucide-react';
import { useGetAllMembers } from '@/hooks/useQueries';
import { useQueryClient } from '@tanstack/react-query';
import { Role } from '../backend';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';

function formatSignupTime(signupTime: bigint): string {
  // signupTime is in nanoseconds from the IC
  const ms = Number(signupTime / 1_000_000n);
  const date = new Date(ms);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function roleBadge(role: Role) {
  const map: Record<Role, { label: string; className: string }> = {
    [Role.player]: {
      label: 'Player',
      className: 'bg-gold text-navy font-bold border-0',
    },
    [Role.fan]: {
      label: 'Fan',
      className: 'bg-navy-light text-gold border border-gold/40 font-semibold',
    },
    [Role.supporter]: {
      label: 'Supporter',
      className: 'bg-navy-dark text-white/80 border border-white/20 font-semibold',
    },
  };
  const { label, className } = map[role] ?? { label: String(role), className: '' };
  return (
    <Badge className={`text-xs uppercase tracking-wider rounded-sm px-2 py-0.5 ${className}`}>
      {label}
    </Badge>
  );
}

export default function AdminPage() {
  const { data: members, isLoading, isError, refetch } = useGetAllMembers();
  const queryClient = useQueryClient();

  return (
    <section className="min-h-[70vh] bg-background py-12 px-4 sm:px-6">
      <div className="container mx-auto max-w-5xl">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-sm bg-gold flex items-center justify-center shadow-gold flex-shrink-0">
              <Shield className="w-5 h-5 text-navy" />
            </div>
            <h1 className="font-display text-4xl text-foreground tracking-widest uppercase">
              Admin Panel
            </h1>
          </div>
          <p className="text-muted-foreground font-body text-sm ml-[52px]">
            All registered Blue Panthers members
          </p>
        </div>

        {/* Stats bar */}
        {!isLoading && !isError && members && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
            {[
              { label: 'Total Members', value: members.length, icon: Users },
              {
                label: 'Players',
                value: members.filter((m) => m.role === Role.player).length,
                icon: Shield,
              },
              {
                label: 'Fans',
                value: members.filter((m) => m.role === Role.fan).length,
                icon: Users,
              },
              {
                label: 'Supporters',
                value: members.filter((m) => m.role === Role.supporter).length,
                icon: Users,
              },
            ].map(({ label, value, icon: Icon }) => (
              <div
                key={label}
                className="bg-navy rounded-sm border border-gold/20 px-4 py-3 flex items-center gap-3"
              >
                <Icon className="w-4 h-4 text-gold flex-shrink-0" />
                <div>
                  <p className="font-display text-2xl text-gold leading-none">{value}</p>
                  <p className="text-white/60 text-xs font-body mt-0.5">{label}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Table Card */}
        <div className="bg-navy rounded-sm border border-gold/20 overflow-hidden shadow-navy">
          {/* Table header bar */}
          <div className="px-6 py-4 border-b border-gold/20 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-gold" />
              <span className="font-display text-lg text-white tracking-widest uppercase">
                Registered Members
              </span>
            </div>
            <button
              type="button"
              onClick={() => refetch()}
              aria-label="Refresh members"
              className="text-white/40 hover:text-gold transition-colors p-1 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>

          {/* Loading state */}
          {isLoading && (
            <div className="p-6 space-y-3">
              {['row-a', 'row-b', 'row-c', 'row-d', 'row-e'].map((id) => (
                <Skeleton key={id} className="h-12 w-full bg-navy-light/60 rounded-sm" />
              ))}
            </div>
          )}

          {/* Error state */}
          {isError && (
            <div className="p-12 text-center">
              <Shield className="w-10 h-10 text-gold/40 mx-auto mb-3" />
              <p className="text-white/60 font-body text-sm mb-4">
                Failed to load members. Please try again.
              </p>
              <Button
                onClick={() => queryClient.invalidateQueries({ queryKey: ['members'] })}
                variant="outline"
                size="sm"
                className="border-gold/40 text-gold hover:bg-gold/10 hover:text-gold font-body uppercase tracking-wider text-xs"
              >
                Try Again
              </Button>
            </div>
          )}

          {/* Empty state */}
          {!isLoading && !isError && members && members.length === 0 && (
            <div className="p-16 text-center">
              <div className="w-16 h-16 rounded-full bg-navy-light flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-gold/50" />
              </div>
              <h3 className="font-display text-xl text-white tracking-widest mb-2">
                NO MEMBERS YET
              </h3>
              <p className="text-white/50 font-body text-sm max-w-xs mx-auto">
                No one has signed up yet. Share the link and get the team together!
              </p>
            </div>
          )}

          {/* Members table */}
          {!isLoading && !isError && members && members.length > 0 && (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-gold/20 hover:bg-transparent">
                    <TableHead className="text-gold/80 font-body font-semibold text-xs uppercase tracking-wider">
                      <span className="flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5" /> Name
                      </span>
                    </TableHead>
                    <TableHead className="text-gold/80 font-body font-semibold text-xs uppercase tracking-wider">
                      <span className="flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5" /> Email
                      </span>
                    </TableHead>
                    <TableHead className="text-gold/80 font-body font-semibold text-xs uppercase tracking-wider">
                      <span className="flex items-center gap-1.5">
                        <Shield className="w-3.5 h-3.5" /> Role
                      </span>
                    </TableHead>
                    <TableHead className="text-gold/80 font-body font-semibold text-xs uppercase tracking-wider hidden sm:table-cell">
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" /> Signed Up
                      </span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {members.map((member, idx) => (
                    <TableRow
                      key={member.email}
                      className={`border-gold/10 transition-colors ${
                        idx % 2 === 0 ? 'bg-navy' : 'bg-navy-dark/60'
                      } hover:bg-navy-light/40`}
                    >
                      <TableCell className="font-body font-semibold text-white py-4">
                        {member.name}
                      </TableCell>
                      <TableCell className="font-body text-white/70 text-sm">
                        {member.email}
                      </TableCell>
                      <TableCell>{roleBadge(member.role)}</TableCell>
                      <TableCell className="font-body text-white/50 text-xs hidden sm:table-cell">
                        {formatSignupTime(member.signupTime)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
