import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Shield, Home, Briefcase, Users, AlertTriangle, CheckCircle2, MapPin, Phone, Heart } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const Guide = () => {
  useEffect(() => {
    document.title = "Newcomer's Guide - Céilí Melbourne";
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-gradient-warm">
      <SiteHeader />

      <main className="container flex-1 py-10 md:py-14">
        <header className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            <Heart className="h-3.5 w-3.5" /> For everyone settling in
          </span>
          <h1 className="mt-4 font-display text-4xl font-bold leading-tight md:text-5xl">
            Your Melbourne starter guide
          </h1>
          <p className="mt-3 text-lg text-muted-foreground">
            Practical tips for finding housing, work and friends in Melbourne - and staying safe along the way.
          </p>
        </header>

        <section className="mx-auto mt-12 max-w-4xl">
          <h2 className="font-display text-2xl font-semibold">Stay safe on Céilí Melbourne</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <SafetyCard
              icon={Shield}
              title="Meet in public first"
              body="Always inspect rooms or items in person, ideally during daylight, before paying anything."
            />
            <SafetyCard
              icon={AlertTriangle}
              title="Never wire money sight-unseen"
              body="If a poster asks for a deposit before you've viewed the place or met them, it's almost always a scam."
            />
            <SafetyCard
              icon={CheckCircle2}
              title="Use traceable payments"
              body="Bank transfer with a receipt, PayID, or cash on inspection. Avoid gift cards, crypto or Western Union."
            />
            <SafetyCard
              icon={Phone}
              title="Trust your gut"
              body="Pressure to decide immediately, prices that seem too good, or stories that don't add up - walk away."
            />
          </div>
          <div className="mt-4 rounded-2xl border border-destructive/30 bg-destructive/5 p-4 text-sm">
            <p className="font-medium text-destructive">See something dodgy?</p>
            <p className="mt-1 text-foreground/80">
              Use the <strong>Report</strong> button on any listing. We review every report and remove scams quickly.
            </p>
          </div>
        </section>

        <section className="mx-auto mt-14 max-w-4xl">
          <h2 className="font-display text-2xl font-semibold">Quick start by category</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            <Tile
              icon={Home}
              title="Finding a room"
              body="Most share houses go via inspection. Bring ID, proof of income or savings, and references if you have them."
              to="/c/housing"
              cta="Browse housing"
            />
            <Tile
              icon={Briefcase}
              title="Finding work"
              body="Hospitality, trades and admin roles turn over fast. A TFN, an Aussie phone number and a one-page CV go a long way."
              to="/c/jobs"
              cta="Browse jobs"
            />
            <Tile
              icon={Users}
              title="Meeting people"
              body="GAA clubs, trad sessions, surf meetups, language exchanges - there's a tribe for everyone here."
              to="/c/social"
              cta="Browse social"
            />
          </div>
        </section>

        <section className="mx-auto mt-14 max-w-4xl">
          <h2 className="font-display text-2xl font-semibold">Posting a great listing</h2>
          <ul className="mt-4 grid gap-3 text-sm md:grid-cols-2">
            {[
              "Use a clear, specific title (e.g. \"Sunny double room in Bondi - $380/wk incl. bills\")",
              "Add 3–6 real photos taken on your phone, in natural light",
              "Mention the suburb, nearest train/bus, and any move-in date",
              "Be upfront about bills, bond, lease length and house rules",
              "Reply quickly - most newcomers message 5+ posts at once",
              "Mark your listing as taken (or delete it) when you're sorted",
            ].map((tip) => (
              <li key={tip} className="flex items-start gap-2 rounded-xl border border-border bg-card/60 p-3">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>{tip}</span>
              </li>
            ))}
          </ul>
          <div className="mt-5">
            <Button asChild variant="hero">
              <Link to="/post">Post a listing</Link>
            </Button>
          </div>
        </section>

        <section className="mx-auto mt-14 max-w-4xl">
          <h2 className="font-display text-2xl font-semibold">Suburbs at a glance</h2>
          <p className="mt-1 text-sm text-muted-foreground">A rough guide - every suburb has its own personality.</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {SUBURBS.map((s) => (
              <div key={s.name} className="rounded-2xl border border-border bg-card p-4 shadow-card">
                <div className="flex items-center gap-2 font-display font-semibold">
                  <MapPin className="h-4 w-4 text-primary" /> {s.name}
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{s.note}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto mt-14 max-w-3xl">
          <h2 className="font-display text-2xl font-semibold">Frequently asked</h2>
          <Accordion type="single" collapsible className="mt-4">
            {FAQS.map((f, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger className="text-left">{f.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        <section className="mx-auto mt-14 max-w-3xl rounded-3xl border border-border bg-card p-8 text-center shadow-card">
          <h2 className="font-display text-2xl font-semibold">Still have a question?</h2>
          <p className="mt-2 text-muted-foreground">
            The community is the best source of local knowledge. Ask anything - from visa quirks to the best chipper.
          </p>
          <Button asChild variant="hero" className="mt-5">
            <Link to="/community/ask">Ask the community</Link>
          </Button>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
};

const SafetyCard = ({ icon: Icon, title, body }: { icon: any; title: string; body: string }) => (
  <div className="rounded-2xl border border-border bg-card p-4 shadow-card">
    <div className="flex items-center gap-2">
      <span className="grid h-8 w-8 place-items-center rounded-full bg-primary/10 text-primary">
        <Icon className="h-4 w-4" />
      </span>
      <h3 className="font-display font-semibold">{title}</h3>
    </div>
    <p className="mt-2 text-sm text-muted-foreground">{body}</p>
  </div>
);

const Tile = ({ icon: Icon, title, body, to, cta }: { icon: any; title: string; body: string; to: string; cta: string }) => (
  <div className="flex flex-col rounded-2xl border border-border bg-card p-5 shadow-card">
    <Icon className="h-6 w-6 text-primary" />
    <h3 className="mt-3 font-display text-lg font-semibold">{title}</h3>
    <p className="mt-1 flex-1 text-sm text-muted-foreground">{body}</p>
    <Button asChild variant="soft" size="sm" className="mt-4 self-start">
      <Link to={to}>{cta}</Link>
    </Button>
  </div>
);

const SUBURBS = [
  { name: "Bondi & Coogee", note: "Beachy, social, lots of share houses - pricier rent, easy bus into the city." },
  { name: "Inner West (Newtown, Marrickville)", note: "Music, pubs, multicultural food. Train lines everywhere." },
  { name: "North Shore (Crows Nest, Neutral Bay)", note: "Quieter, leafy, family-friendly, quick ferry to the CBD." },
  { name: "Surry Hills & Darlinghurst", note: "Café culture and nightlife - small rooms, big atmosphere." },
  { name: "Manly & Northern Beaches", note: "Surf and ferries. Further out, but a lifestyle of its own." },
  { name: "Parramatta & West", note: "Better value rent, big Irish/UK/NZ communities, fast trains east." },
];

const FAQS = [
  { q: "Is Céilí Melbourne free to use?", a: "Yes - posting and browsing are completely free." },
  { q: "Do I need an account?", a: "You can browse without one. An account lets you save favourites, manage your listings and report scams." },
  { q: "How long do listings stay up?", a: "60 days by default. You can renew yours for another 60 days from the My posts page anytime." },
  { q: "I'm being scammed - what do I do?", a: "Hit Report on the listing, stop all contact, and never send money. If you've already paid, contact your bank immediately and report it to Scamwatch (scamwatch.gov.au)." },
  { q: "Who runs Céilí Melbourne?", a: "A small team of newcomers who got tired of dodgy Facebook groups. We're community-first, ad-free, and listening - drop us a line anytime." },
];

export default Guide;
