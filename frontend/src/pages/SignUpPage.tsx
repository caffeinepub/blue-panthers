import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, AlertCircle, Loader2, ChevronLeft, UserPlus } from 'lucide-react';
import { useRegisterMember } from '@/hooks/useQueries';
import { Role } from '../backend';

interface FormValues {
  name: string;
  email: string;
  role: string;
}

export default function SignUpPage() {
  const [selectedRole, setSelectedRole] = useState<string>('');
  const [roleError, setRoleError] = useState<string>('');
  const [successData, setSuccessData] = useState<{ name: string; role: string } | null>(null);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormValues>();
  const registerMutation = useRegisterMember();

  const roleToEnum = (role: string): Role => {
    switch (role) {
      case 'player': return Role.player;
      case 'fan': return Role.fan;
      case 'supporter': return Role.supporter;
      default: return Role.fan;
    }
  };

  const onSubmit = async (data: FormValues) => {
    if (!selectedRole) {
      setRoleError('Please select a role.');
      return;
    }
    setRoleError('');

    try {
      await registerMutation.mutateAsync({
        name: data.name.trim(),
        email: data.email.trim().toLowerCase(),
        role: roleToEnum(selectedRole),
      });
      setSuccessData({ name: data.name.trim(), role: selectedRole });
      reset();
      setSelectedRole('');
    } catch (err) {
      // Error handled via mutation state
    }
  };

  const handleSignUpAnother = () => {
    setSuccessData(null);
    registerMutation.reset();
  };

  const getRoleLabel = (role: string) => {
    const labels: Record<string, string> = { player: 'Player', fan: 'Fan', supporter: 'Supporter' };
    return labels[role] || role;
  };

  const getErrorMessage = (error: Error | null): string => {
    if (!error) return '';
    const msg = error.message || '';
    if (msg.includes('already registered') || msg.includes('already exists')) {
      return 'This email address is already registered. Try a different email.';
    }
    return 'Something went wrong. Please try again.';
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col lg:flex-row">
      {/* Left panel - branding */}
      <div className="hidden lg:flex lg:w-2/5 bg-navy flex-col justify-between p-12 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10 bg-cover bg-center"
          style={{ backgroundImage: "url('/assets/generated/hero-banner.dim_1200x400.png')" }}
          aria-hidden="true"
        />
        <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-gold opacity-5" aria-hidden="true" />

        <div className="relative z-10">
          <Link to="/" className="flex items-center gap-3 group w-fit">
            <div className="w-8 h-8 rounded-full bg-gold flex items-center justify-center">
              <span className="font-display text-navy text-base leading-none">BP</span>
            </div>
            <span className="font-display text-xl text-white tracking-widest group-hover:text-gold transition-colors">
              BLUE PANTHERS
            </span>
          </Link>
        </div>

        <div className="relative z-10 flex flex-col items-center">
          <img
            src="/assets/generated/panther-mascot.dim_512x512.png"
            alt="Blue Panthers Mascot"
            className="w-64 h-64 object-contain drop-shadow-2xl"
          />
        </div>

        <div className="relative z-10">
          <h2 className="font-display text-5xl text-white leading-none mb-3">
            JOIN THE <br /><span className="text-gold">PRIDE</span>
          </h2>
          <p className="text-white/60 font-body text-sm leading-relaxed max-w-xs">
            Become part of something bigger. Sign up and let's make history together on the court.
          </p>
        </div>
      </div>

      {/* Right panel - form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-10 bg-background">
        <div className="w-full max-w-md">
          {/* Mobile back link */}
          <Link
            to="/"
            className="lg:hidden inline-flex items-center gap-1 text-muted-foreground hover:text-foreground font-body text-sm mb-6 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Home
          </Link>

          {successData ? (
            /* Success State */
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-gold/10 border-2 border-gold flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10 text-gold" />
              </div>
              <h1 className="font-display text-4xl text-navy mb-2">YOU'RE IN!</h1>
              <p className="text-muted-foreground font-body text-base mb-6">
                Welcome to the Blue Panthers,{' '}
                <span className="font-semibold text-foreground">{successData.name}</span>!
                You've joined as a{' '}
                <Badge className="bg-gold/10 text-gold border-gold/30 font-body text-xs uppercase tracking-wider">
                  {getRoleLabel(successData.role)}
                </Badge>
              </p>
              <div className="bg-gold/5 border border-gold/20 rounded-lg p-5 mb-8 text-left">
                <p className="font-body text-sm text-muted-foreground leading-relaxed">
                  🏀 We'll be in touch soon with team updates, schedules, and everything you need to get started. Get ready to roar!
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  onClick={handleSignUpAnother}
                  variant="outline"
                  className="flex-1 border-navy text-navy hover:bg-navy hover:text-white font-body font-semibold rounded-sm uppercase tracking-wider"
                >
                  Sign Up Another
                </Button>
                <Link to="/" className="flex-1">
                  <Button className="w-full bg-navy text-white hover:bg-navy-light font-body font-semibold rounded-sm uppercase tracking-wider">
                    Back to Home
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            /* Form State */
            <>
              <div className="mb-8">
                <Badge className="mb-3 bg-gold/10 text-gold border-gold/30 font-body text-xs uppercase tracking-widest px-3 py-1">
                  Registration
                </Badge>
                <h1 className="font-display text-5xl text-navy leading-none mb-2">
                  JOIN THE TEAM
                </h1>
                <p className="text-muted-foreground font-body text-sm">
                  Fill in your details below to become a Blue Panther.
                </p>
              </div>

              {/* Error Alert */}
              {registerMutation.isError && (
                <Alert variant="destructive" className="mb-6 border-destructive/50">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle className="font-body font-semibold">Registration Failed</AlertTitle>
                  <AlertDescription className="font-body text-sm">
                    {getErrorMessage(registerMutation.error)}
                  </AlertDescription>
                </Alert>
              )}

              <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
                {/* Full Name */}
                <div className="space-y-1.5">
                  <Label htmlFor="name" className="font-body font-semibold text-sm text-foreground uppercase tracking-wide">
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="e.g. Jordan Williams"
                    className={`font-body rounded-sm h-11 ${errors.name ? 'border-destructive focus-visible:ring-destructive' : 'border-input focus-visible:ring-gold'}`}
                    {...register('name', {
                      required: 'Full name is required.',
                      minLength: { value: 2, message: 'Name must be at least 2 characters.' },
                      maxLength: { value: 80, message: 'Name must be under 80 characters.' },
                    })}
                  />
                  {errors.name && (
                    <p className="text-destructive text-xs font-body flex items-center gap-1 mt-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <Label htmlFor="email" className="font-body font-semibold text-sm text-foreground uppercase tracking-wide">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="e.g. jordan@example.com"
                    className={`font-body rounded-sm h-11 ${errors.email ? 'border-destructive focus-visible:ring-destructive' : 'border-input focus-visible:ring-gold'}`}
                    {...register('email', {
                      required: 'Email address is required.',
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: 'Please enter a valid email address.',
                      },
                    })}
                  />
                  {errors.email && (
                    <p className="text-destructive text-xs font-body flex items-center gap-1 mt-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Role */}
                <div className="space-y-1.5">
                  <Label htmlFor="role" className="font-body font-semibold text-sm text-foreground uppercase tracking-wide">
                    Your Role
                  </Label>
                  <Select value={selectedRole} onValueChange={(val) => { setSelectedRole(val); setRoleError(''); }}>
                    <SelectTrigger
                      id="role"
                      className={`font-body rounded-sm h-11 ${roleError ? 'border-destructive' : 'border-input focus:ring-gold'}`}
                    >
                      <SelectValue placeholder="Select your role..." />
                    </SelectTrigger>
                    <SelectContent className="font-body">
                      <SelectItem value="player" className="cursor-pointer">
                        <span className="flex items-center gap-2">
                          <span>🏀</span>
                          <span>Player</span>
                        </span>
                      </SelectItem>
                      <SelectItem value="fan" className="cursor-pointer">
                        <span className="flex items-center gap-2">
                          <span>📣</span>
                          <span>Fan</span>
                        </span>
                      </SelectItem>
                      <SelectItem value="supporter" className="cursor-pointer">
                        <span className="flex items-center gap-2">
                          <span>⭐</span>
                          <span>Supporter</span>
                        </span>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  {roleError && (
                    <p className="text-destructive text-xs font-body flex items-center gap-1 mt-1">
                      <AlertCircle className="w-3 h-3" />
                      {roleError}
                    </p>
                  )}
                </div>

                {/* Submit */}
                <Button
                  type="submit"
                  size="lg"
                  disabled={registerMutation.isPending}
                  className="w-full bg-gold text-navy font-body font-bold text-base hover:bg-gold-light shadow-gold rounded-sm uppercase tracking-wider mt-2 h-12"
                >
                  {registerMutation.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Signing Up...
                    </>
                  ) : (
                    <>
                      <UserPlus className="mr-2 h-5 w-5" />
                      Join the Blue Panthers
                    </>
                  )}
                </Button>
              </form>

              <p className="text-center text-muted-foreground font-body text-xs mt-6">
                Already a member?{' '}
                <Link to="/" className="text-gold hover:text-gold-dark underline underline-offset-2 transition-colors">
                  Go back home
                </Link>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
