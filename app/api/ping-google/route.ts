import { NextResponse } from 'next/server';

/**
 * API pour notifier Google d'une mise à jour du sitemap
 * 
 * Usage: GET /api/ping-google
 * 
 * Cette API ping l'URL Google pour signaler une mise à jour du sitemap.
 * À appeler après chaque déploiement ou mise à jour de contenu.
 */

const SITEMAP_URL = 'https://www.ipb-expertise.fr/sitemap.xml';

export async function GET() {
  const googlePingUrl = `https://www.google.com/ping?sitemap=${encodeURIComponent(SITEMAP_URL)}`;
  
  try {
    const response = await fetch(googlePingUrl);
    
    return NextResponse.json({
      success: response.ok,
      message: response.ok 
        ? 'Google a été notifié du sitemap' 
        : 'Erreur lors de la notification',
      googlePingUrl,
      status: response.status,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: 'Erreur de connexion à Google',
      error: error instanceof Error ? error.message : 'Unknown',
    }, { status: 500 });
  }
}
