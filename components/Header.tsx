"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import { useState } from "react"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-ipb-orange">IPB</span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/" className="text-sm font-medium transition-colors hover:text-ipb-orange">
            Accueil
          </Link>
          <Link href="/diagnostic" className="text-sm font-medium transition-colors hover:text-ipb-orange">
            Diagnostic
          </Link>
          <Link href="#services" className="text-sm font-medium transition-colors hover:text-ipb-orange">
            Services
          </Link>
          <Link href="#reviews" className="text-sm font-medium transition-colors hover:text-ipb-orange">
            Avis
          </Link>
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          <Button asChild variant="outline">
            <Link href="/diagnostic">Commencer</Link>
          </Button>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <Menu className="h-6 w-6" />
        </Button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t">
          <div className="container flex flex-col space-y-4 py-4">
            <Link href="/" className="text-sm font-medium">Accueil</Link>
            <Link href="/diagnostic" className="text-sm font-medium">Diagnostic</Link>
            <Link href="#services" className="text-sm font-medium">Services</Link>
            <Link href="#reviews" className="text-sm font-medium">Avis</Link>
            <Button asChild className="w-full">
              <Link href="/diagnostic">Commencer</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}

