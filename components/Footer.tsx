import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container py-12 md:py-16">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-ipb-orange">IPB</h3>
            <p className="text-sm text-muted-foreground">
              Plateforme de diagnostic et solutions pour vous accompagner dans vos projets.
            </p>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-ipb-slate">Navigation</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-ipb-orange transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <Link href="/diagnostic" className="text-muted-foreground hover:text-ipb-orange transition-colors">
                  Diagnostic
                </Link>
              </li>
              <li>
                <Link href="#services" className="text-muted-foreground hover:text-ipb-orange transition-colors">
                  Services
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-ipb-slate">Légal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="text-muted-foreground hover:text-ipb-orange transition-colors">
                  Confidentialité
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-ipb-orange transition-colors">
                  Conditions d'utilisation
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-ipb-slate">Contact</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>contact@ipb.fr</li>
              <li>+33 1 23 45 67 89</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} IPB. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  )
}

