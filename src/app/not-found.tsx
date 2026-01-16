import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <h1 className="text-9xl font-black text-orange-600 mb-4">404</h1>
        <h2 className="text-3xl font-bold text-slate-900 mb-4">
          Page introuvable
        </h2>
        <p className="text-slate-600 mb-8">
          La page que vous recherchez n'existe pas ou a été déplacée.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild className="bg-orange-600 hover:bg-orange-700">
            <Link href="/">Retour à l'accueil</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/diagnostic">Faire un diagnostic</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

