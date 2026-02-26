import { useState } from "react";
import { Role } from "../backend";
import { useRegisterMember } from "../hooks/useQueries";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CheckCircle, AlertCircle, Loader2, Shield, Users, Trophy, MapPin } from "lucide-react";

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<Role | "">("");
  const [formError, setFormError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const registerMember = useRegisterMember();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    // Basic validation
    if (!name.trim()) {
      setFormError("Please enter your full name.");
      return;
    }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setFormError("Please enter a valid email address.");
      return;
    }
    if (!role) {
      setFormError("Please select a role.");
      return;
    }

    try {
      await registerMember.mutateAsync({ name: name.trim(), email: email.trim(), role });
      setSubmitted(true);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      if (message.toLowerCase().includes("already registered") || message.toLowerCase().includes("already exists")) {
        setFormError("This email is already registered. Please use a different email.");
      } else if (message.toLowerCase().includes("not connected")) {
        setFormError("Not connected to the network. Please refresh and try again.");
      } else {
        setFormError("Something went wrong. Please try again.");
      }
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="bg-card border border-border rounded-2xl p-10 max-w-md w-full text-center shadow-gold">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-primary" />
            </div>
          </div>
          <h2 className="font-display text-3xl text-foreground mb-3 tracking-wide">
            WELCOME TO THE TEAM!
          </h2>
          <p className="text-muted-foreground mb-2">
            You're officially part of the Blue Panthers family.
          </p>
          <p className="text-muted-foreground mb-8">
            We'll be in touch soon with next steps.
          </p>
          <div className="bg-primary/10 rounded-xl p-4 mb-8">
            <p className="text-sm font-medium text-foreground">Registered as</p>
            <p className="text-lg font-semibold text-primary capitalize">{role}</p>
            <p className="text-sm text-muted-foreground">{email}</p>
          </div>
          <Button
            onClick={() => {
              setSubmitted(false);
              setName("");
              setEmail("");
              setRole("");
              setFormError("");
            }}
            variant="outline"
            className="w-full"
          >
            Register Another Member
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-navy-900 flex-col justify-between p-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-12">
            <img
              src="/assets/generated/panther-mascot.dim_512x512.png"
              alt="Blue Panthers Mascot"
              className="w-16 h-16 object-contain"
            />
            <div>
              <p className="font-display text-2xl text-primary tracking-widest">BLUE PANTHERS</p>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Official Registration</p>
            </div>
          </div>

          <h1 className="font-display text-5xl text-white leading-tight mb-6 tracking-wide">
            JOIN THE<br />
            <span className="text-primary">PRIDE.</span>
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed max-w-sm">
            Become part of something bigger. Whether you play, cheer, or support — the Blue Panthers need you.
          </p>
        </div>

        <div className="relative z-10 space-y-4">
          {[
            { icon: MapPin, label: "Jackman, Maine 04945", desc: "USA — Home of the Blue Panthers" },
            { icon: Trophy, label: "Championship Legacy", desc: "Join a winning tradition" },
            { icon: Users, label: "Strong Community", desc: "Members-only events & updates" },
            { icon: Shield, label: "Exclusive Access", desc: "Members-only events & updates" },
          ].map(({ icon: Icon, label, desc }) => (
            <div key={label} className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                <Icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-white font-medium text-sm">{label}</p>
                <p className="text-muted-foreground text-xs">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="flex lg:hidden items-center gap-3 mb-8">
            <img
              src="/assets/generated/panther-mascot.dim_512x512.png"
              alt="Blue Panthers Mascot"
              className="w-10 h-10 object-contain"
            />
            <p className="font-display text-xl text-primary tracking-widest">BLUE PANTHERS</p>
          </div>

          <div className="mb-8">
            <h2 className="font-display text-4xl text-foreground tracking-wide mb-2">
              SIGN UP
            </h2>
            <p className="text-muted-foreground mb-3">
              Fill in your details to join the Blue Panthers.
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
              <span>Jackman, Maine 04945, USA</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-foreground font-medium">
                Full Name
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="e.g. Jordan Smith"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={registerMember.isPending}
                className="bg-card border-border focus:border-primary"
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground font-medium">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="e.g. jordan@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={registerMember.isPending}
                className="bg-card border-border focus:border-primary"
              />
            </div>

            {/* Role */}
            <div className="space-y-2">
              <Label htmlFor="role" className="text-foreground font-medium">
                I want to join as a...
              </Label>
              <Select
                value={role}
                onValueChange={(val) => setRole(val as Role)}
                disabled={registerMember.isPending}
              >
                <SelectTrigger id="role" className="bg-card border-border w-full">
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={Role.player}>🏀 Player</SelectItem>
                  <SelectItem value={Role.fan}>📣 Fan</SelectItem>
                  <SelectItem value={Role.supporter}>🤝 Supporter</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Error message */}
            {formError && (
              <div className="flex items-start gap-3 p-4 rounded-lg bg-destructive/10 border border-destructive/20">
                <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                <p className="text-sm text-destructive">{formError}</p>
              </div>
            )}

            {/* Submit */}
            <Button
              type="submit"
              className="w-full font-display tracking-widest text-base"
              size="lg"
              disabled={registerMember.isPending}
            >
              {registerMember.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  REGISTERING...
                </>
              ) : (
                "JOIN THE TEAM"
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
