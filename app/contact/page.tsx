"use client";

import { useState } from 'react';
import { TopBar } from '@/components/home/TopBar';
import { Navbar } from '@/components/home/Navbar';
import { Footer } from '@/components/home/Footer';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { MapPin, Phone, Mail, Send, CheckCircle } from 'lucide-react';
import { submitContactForm } from '@/app/actions/contact';
import { InternalLinks } from '@/components/seo/InternalLinks';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('subject', formData.subject);
      formDataToSend.append('message', formData.message);

      const result = await submitContactForm(formDataToSend);

      if (result.success) {
        setIsSubmitted(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
        // Réinitialiser le message de succès après 5 secondes
        setTimeout(() => setIsSubmitted(false), 5000);
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error('Erreur:', error);
      alert('Une erreur est survenue. Veuillez réessayer ou nous appeler au 05 82 95 33 75.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="font-sans text-slate-800 bg-slate-50 antialiased">
      <TopBar />
      <Navbar />
      
      <main className="bg-white min-h-screen py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* En-tête */}
          <div className="text-center mb-8 md:mb-12">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-3 md:mb-4">
              Contactez-nous
            </h1>
            <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto">
              Une question ? Un projet ? Notre équipe d'experts est à votre écoute pour vous accompagner.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
            {/* Colonne gauche - Informations */}
            <div className="space-y-6 md:space-y-8">
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-4 md:mb-6">Nos coordonnées</h2>
                <div className="space-y-4 md:space-y-6">
                  {/* Adresse */}
                  <div className="flex items-start gap-3 md:gap-4">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-orange-100 rounded-xl flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5 md:w-6 md:h-6 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm md:text-base text-slate-900 mb-1">Adresse</h3>
                      <p className="text-sm md:text-base text-slate-600">
                        266 Av. de Lardenne<br />
                        31100 Toulouse, France
                      </p>
                      <a
                        href="https://www.google.com/maps/search/?api=1&query=31c+chemin+de+roquettes+31100+Toulouse"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-orange-600 hover:text-orange-700 font-medium text-sm mt-2 inline-block"
                      >
                        Voir sur Google Maps →
                      </a>
                    </div>
                  </div>

                  {/* Téléphone */}
                  <div className="flex items-start gap-3 md:gap-4">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-100 rounded-xl flex items-center justify-center shrink-0">
                      <Phone className="w-5 h-5 md:w-6 md:h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm md:text-base text-slate-900 mb-1">Téléphone</h3>
                      <a
                        href="tel:0582953375"
                        className="text-slate-600 hover:text-orange-600 font-medium"
                      >
                        05 82 95 33 75
                      </a>
                      <p className="text-sm text-slate-500 mt-1">Du lundi au vendredi, 9h-18h</p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-3 md:gap-4">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-slate-100 rounded-xl flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5 md:w-6 md:h-6 text-slate-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm md:text-base text-slate-900 mb-1">Email</h3>
                      <a
                        href="mailto:contact@ipb-expertise.fr"
                        className="text-slate-600 hover:text-orange-600 font-medium"
                      >
                        contact@ipb-expertise.fr
                      </a>
                      <p className="text-sm text-slate-500 mt-1">Réponse sous 24h</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Carte Google Maps */}
              <div className="mt-6 md:mt-8">
                <h3 className="font-bold text-base md:text-lg text-slate-900 mb-3 md:mb-4">Nous trouver</h3>
                <div className="rounded-xl overflow-hidden border border-slate-200 shadow-lg">
                  <iframe
                    src="https://www.google.com/maps?q=31c+chemin+de+roquettes+31100+Toulouse&output=embed"
                    width="100%"
                    height="250"
                    className="w-full md:h-[300px]"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
                <p className="text-sm text-slate-500 mt-2 text-center">
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=31c+chemin+de+roquettes+31100+Toulouse"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-orange-600 hover:text-orange-700"
                  >
                    Ouvrir dans Google Maps
                  </a>
                </p>
              </div>
            </div>

            {/* Colonne droite - Formulaire */}
            <div>
              <div className="bg-slate-50 rounded-2xl p-6 md:p-8 border border-slate-200">
                <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-4 md:mb-6">Envoyez-nous un message</h2>
                
                {isSubmitted ? (
                  <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
                    <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
                    <p className="text-green-800 font-bold mb-2">Message envoyé avec succès !</p>
                    <p className="text-green-700 text-sm">Nous vous répondrons dans les plus brefs délais.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-bold text-slate-900 mb-2">
                        Nom et Prénom *
                      </label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full"
                        placeholder="Votre nom complet"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-bold text-slate-900 mb-2">
                        Email *
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full"
                        placeholder="votre@email.com"
                      />
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-sm font-bold text-slate-900 mb-2">
                        Sujet *
                      </label>
                      <Input
                        id="subject"
                        name="subject"
                        type="text"
                        required
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full"
                        placeholder="Objet de votre message"
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-bold text-slate-900 mb-2">
                        Message *
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        required
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full min-h-[150px]"
                        placeholder="Décrivez votre demande ou votre projet..."
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-6 text-lg"
                    >
                      {isSubmitting ? (
                        'Envoi en cours...'
                      ) : (
                        <>
                          <Send className="w-5 h-5 mr-2" />
                          Envoyer le message
                        </>
                      )}
                    </Button>

                    <p className="text-xs text-slate-500 text-center">
                      * Champs obligatoires. Vos données sont traitées conformément à notre{' '}
                      <a href="/legal/confidentialite" className="text-orange-600 hover:text-orange-700 underline">
                        politique de confidentialité
                      </a>
                      .
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <InternalLinks variant="contact" />
      </div>

      <Footer />
    </div>
  );
}

