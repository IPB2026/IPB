"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, Zap, Shield, TrendingUp } from "lucide-react"
import { motion } from "framer-motion"

const services = [
  {
    icon: CheckCircle2,
    title: "Diagnostic Rapide",
    description: "Obtenez un diagnostic précis en quelques minutes grâce à notre système intelligent.",
    color: "text-ipb-orange"
  },
  {
    icon: Zap,
    title: "Solutions Personnalisées",
    description: "Recevez des recommandations adaptées à votre situation spécifique.",
    color: "text-ipb-blue"
  },
  {
    icon: Shield,
    title: "Sécurisé et Fiable",
    description: "Vos données sont protégées et traitées avec la plus grande confidentialité.",
    color: "text-ipb-orange"
  },
  {
    icon: TrendingUp,
    title: "Suivi Continu",
    description: "Suivez votre progression et obtenez des mises à jour régulières.",
    color: "text-ipb-blue"
  }
]

export function Services() {
  return (
    <section id="services" className="py-20 bg-background">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-ipb-slate">
            Nos Services
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Découvrez comment nous pouvons vous aider à résoudre vos problèmes efficacement.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <Icon className={`h-10 w-10 ${service.color} mb-4`} />
                    <CardTitle className="text-ipb-slate">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {service.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

