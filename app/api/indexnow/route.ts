import { NextRequest, NextResponse } from 'next/server';

// ═══════════════════════════════════════════════════════════════
// INDEXNOW API - Notification instantanée aux moteurs de recherche
// ═══════════════════════════════════════════════════════════════
// 
// Ce endpoint permet de soumettre des URLs à IndexNow pour une
// indexation rapide par Bing, Yandex, et les moteurs compatibles.
// 
// Usage: POST /api/indexnow
// Body: { urls: string[] } ou { url: string }
// Headers: x-api-key: INDEXNOW_SECRET (variable d'environnement)
//
// ═══════════════════════════════════════════════════════════════

const INDEXNOW_KEY = '3c7f0e731bd5699d57a1a6e9c52c915e';
const SITE_URL = 'https://www.ipb-expertise.fr';

// Endpoints IndexNow (Bing et Yandex sont les principaux)
const INDEXNOW_ENDPOINTS = [
  'https://api.indexnow.org/indexnow',
  'https://www.bing.com/indexnow',
  'https://yandex.com/indexnow',
];

interface IndexNowPayload {
  host: string;
  key: string;
  keyLocation: string;
  urlList: string[];
}

async function submitToIndexNow(urls: string[]): Promise<{ success: boolean; results: Record<string, string> }> {
  const payload: IndexNowPayload = {
    host: 'www.ipb-expertise.fr',
    key: INDEXNOW_KEY,
    keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
    urlList: urls.slice(0, 10000), // IndexNow limite à 10000 URLs par requête
  };

  const results: Record<string, string> = {};

  // Soumettre à chaque endpoint IndexNow
  for (const endpoint of INDEXNOW_ENDPOINTS) {
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      results[endpoint] = response.ok 
        ? `OK (${response.status})` 
        : `Error (${response.status})`;
    } catch (error) {
      results[endpoint] = `Failed: ${error instanceof Error ? error.message : 'Unknown error'}`;
    }
  }

  const hasSuccess = Object.values(results).some(r => r.includes('OK'));
  return { success: hasSuccess, results };
}

export async function POST(request: NextRequest) {
  // Vérification de l'API key pour sécuriser l'endpoint
  const apiKey = request.headers.get('x-api-key');
  const expectedKey = process.env.INDEXNOW_SECRET;

  if (expectedKey && apiKey !== expectedKey) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();
    
    // Accepter soit une URL unique, soit une liste
    let urls: string[] = [];
    
    if (body.url) {
      urls = [body.url];
    } else if (body.urls && Array.isArray(body.urls)) {
      urls = body.urls;
    } else {
      return NextResponse.json(
        { error: 'Missing url or urls in request body' },
        { status: 400 }
      );
    }

    // Valider les URLs
    urls = urls.filter(url => {
      try {
        new URL(url);
        return url.startsWith(SITE_URL);
      } catch {
        return false;
      }
    });

    if (urls.length === 0) {
      return NextResponse.json(
        { error: 'No valid URLs provided' },
        { status: 400 }
      );
    }

    const result = await submitToIndexNow(urls);

    return NextResponse.json({
      message: 'IndexNow submission completed',
      urlsSubmitted: urls.length,
      ...result,
    });
  } catch (error) {
    console.error('IndexNow API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Endpoint GET pour vérifier le statut
export async function GET() {
  return NextResponse.json({
    status: 'IndexNow API ready',
    key: INDEXNOW_KEY,
    keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
    usage: 'POST /api/indexnow with { urls: [...] } or { url: "..." }',
  });
}
