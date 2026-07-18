# Arborescence canonique d'un dossier IPB

> Référence unique des états et de leurs INVARIANTS. Le CRM dérive la phase des
> artefacts (`computeDossier`) — un état ne se décrète pas, il se constate.
> Mise à jour : 18 juillet 2026 (post-audits).

## L'arbre

```
PROSPECT
└─ NOUVEAU ─────────── fiche créée (tout canal → captureLead, dédup contact+dossier)
   └─ DEVIS_ENVOYE ─── devis status=ENVOYE (e-mail parti)
      ├─ PERDU ✗ ────── refus/silence (3 relances + 30 j → EXPIRE auto)
      └─ DEVIS_VALIDE ─ devis status=ACCEPTE  ⟵ SEULS chemins :
         │                • bouton « Marquer accepté » (confirmé)
         │                • « Bon pour accord » en ligne
         │                • réservation d'un créneau (acceptation tacite)
         │                • RDV diagnostic créé dans l'agenda (acceptation tacite)
         │                • conversion en facture
         │                → TOUS posent acceptedAt + PhaseEvent + stage GAGNE
         └─ RDV_PLANIFIE ─ appointment PLANIFIE futur (jamais sans RDV réel)
            └─ VISITE_FAITE ─ appointment REALISE
               └─ FACTURE_ENVOYEE ─ facture ENVOYEE (auto J+1, brouillon relu)
                  └─ PAIEMENT_RECU ─ facture PAYEE  ⟸ DÉCLENCHEUR du rapport
                     └─ RAPPORT ─ rapport rédigé, envoi VERROUILLÉ si non payé
                        ├─ TERMINÉ ─ rapport sans budgetHT (≈ 90 %)
                        └─ SUIVI ─── rapport avec budgetHT → 2 sem. → TERMINÉ
```

## Les invariants (vérifiés par le cron quotidien)

1. `devis.acceptedAt ⇔ devis.status = ACCEPTE` — tous les chemins d'acceptation alignés.
2. **Contact facturé ⇒ aucun devis « ENVOYE » résiduel** (soldé automatiquement, tracé).
3. `stage RDV_PLANIFIE ⇒ appointment PLANIFIE existant` (plus de fantômes).
4. Facture PAYEE ⇒ dossier jamais « PERDU » (garde UI + MCP).
5. Rapport ENVOYE ⇒ facture PAYEE antérieure (verrou dans la fonction d'envoi).
6. Corbeille ⇒ hors relances, hors KPIs, hors avis.
7. Un contact = une fiche (email/téléphone UNIQUES en base) ; un devis = une facture active.

## Ce que le CRM ne peut PAS deviner (à cliquer, 2 s chacun)

- **Paiement reçu en banque** → fiche facture → « Marquer payée » (ou dire au
  connecteur : « la facture de X est payée »). Déclenche rapport + boucle avis.
- **Accord donné par téléphone SANS RDV dans la foulée** → « Marquer accepté ».
