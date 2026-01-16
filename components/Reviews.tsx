"use client"

import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card"
import { Star } from "lucide-react"
import { motion } from "framer-motion"

const reviews = [
  {
    name: "Marie Dupont",
    role: "Entrepreneuse",
    content: "Le diagnostic m'a permis d'identifier rapidement les problèmes et de trouver des solutions adaptées. Très satisfaite !",
    rating: 5
  },
  {
    name: "Jean Martin",
    role: "Consultant",
    content: "Plateforme intuitive et efficace. Les recommandations sont pertinentes et faciles à mettre en œuvre.",
    rating: 5
  },
  {
    name: "Sophie Bernard",
    role: "Directrice Marketing",
    content: "Excellent service client et diagnostic précis. Je recommande vivement cette plateforme.",
    rating: 5
  }
]

export function Reviews() {
  return (
    <section id="reviews" className="py-20 bg-muted/50">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-ipb-slate">
            Ce que disent nos clients
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Découvrez les témoignages de ceux qui nous font confiance.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          {reviews.map((review, index) => (
            <motion.div
              key={review.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="h-full">
                <CardHeader>
                  <div className="flex items-center gap-1 mb-2">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-ipb-orange text-ipb-orange" />
                    ))}
                  </div>
                  <CardDescription className="text-base">
                    {review.content}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="font-semibold text-ipb-slate">{review.name}</div>
                  <div className="text-sm text-muted-foreground">{review.role}</div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

