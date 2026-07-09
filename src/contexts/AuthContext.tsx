import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

interface AuthCtx {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signOut: () => Promise<void>;
}

const Ctx = createContext<AuthCtx>({ user: null, session: null, loading: true, signOut: async () => {} });

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Resolve the initial session first, then watch for changes.
    // Using getSession() to set the initial state avoids a brief "loading"
    // flash that could occur if the listener fires before the session is ready.
    supabase.auth.getSession().then(async ({ data }) => {
      if (
        data.session &&
        localStorage.getItem("ceili_no_persist") === "1" &&
        !sessionStorage.getItem("ceili_session_active")
      ) {
        await supabase.auth.signOut();
        localStorage.removeItem("ceili_no_persist");
        setSession(null);
      } else {
        setSession(data.session);
      }
      setLoading(false);
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => {
      setSession(s);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  return (
    <Ctx.Provider value={{ session, user: session?.user ?? null, loading, signOut: async () => { await supabase.auth.signOut(); } }}>
      {children}
    </Ctx.Provider>
  );
};

export const useAuth = () => useContext(Ctx);
