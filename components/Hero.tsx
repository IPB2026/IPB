"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-ipb-slate via-ipb-slate/95 to-background py-20 md:py-32">
      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
            Diagnostic et Solutions
            <span className="text-ipb-orange"> IPB</span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-300 sm:text-xl">
            Obtenez un diagnostic personnalisé et des solutions adaptées à vos besoins.
            Notre plateforme vous guide étape par étape pour identifier et résoudre vos problèmes.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button asChild size="lg" className="bg-ipb-orange hover:bg-ipb-orange/90 text-white">
              <Link href="/diagnostic">
                Commencer le diagnostic
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              <Link href="#services">En savoir plus</Link>
            </Button>
          </div>
        </motion.div>
      </div>
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_50%,rgba(234,88,12,0.1),transparent_50%)]" />
    </section>
  )
}

