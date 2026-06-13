import { PrismaClient } from '@prisma/client';
const p = new PrismaClient();
const data = [
  { name:'Lionel Pereira', phone:'06 43 33 01 64', city:'Muret', postalCode:'31600', source:'CALCULATEUR', service:'MUR_PORTEUR', tier:'WARM', stage:'DEVIS_ENVOYE', value:449, summary:'Cuisine ouverte — estimation 4 200–5 800 €', occupantStatus:'PROPRIETAIRE' },
  { name:'Maria José Garcia', phone:'06 86 22 64 50', email:'mariajose@cortinas.fr', city:'Plaisance-du-Touch', postalCode:'31830', source:'DIAGNOSTIC', service:'FISSURES', tier:'HOT', stage:'VISITE_FAITE', riskScore:78, value:6000, summary:'Fissures actives 3 zones — désordre confirmé', occupantStatus:'PROPRIETAIRE', reasons:['Fissure large (> 2 mm)','Évolution rapide observée','Propriétaire occupant'] },
  { name:'M. Baracat', phone:'06 62 77 40 56', city:'Colomiers', postalCode:'31770', source:'CONTACT', service:'EXPERTISE_ACHAT', tier:'WARM', stage:'GAGNE', value:400, summary:'Expertise avant achat — mandaté par agent immo', occupantStatus:'ACHETEUR' },
  { name:'Sophie Martin', phone:'07 12 88 43 90', email:'s.martin@email.fr', city:'Tournefeuille', postalCode:'31170', source:'DIAGNOSTIC', service:'HUMIDITE', tier:'COLD', stage:'NOUVEAU', riskScore:34, summary:'Salpêtre bas de mur — à surveiller', occupantStatus:'LOCATAIRE' },
  { name:'Julien Dubois', phone:'06 71 02 55 18', city:'Auch', postalCode:'32000', source:'RAPPEL', service:'MUR_PORTEUR', tier:'HOT', stage:'A_RAPPELER', callbackPriority:'P1_4H', summary:'Demande de rappel — projet baie vitrée', occupantStatus:'PROPRIETAIRE' },
];
for (const d of data) {
  const c = await p.contact.create({ data: { name:d.name, phone:d.phone, email:d.email??null, city:d.city, postalCode:d.postalCode, occupantStatus:d.occupantStatus } });
  const lead = await p.lead.create({ data: { contactId:c.id, source:d.source, service:d.service, tier:d.tier, stage:d.stage, riskScore:d.riskScore??null, value:d.value??null, callbackPriority:d.callbackPriority??null, summary:d.summary, reasons:d.reasons??[], payload:{ note:d.summary } } });
  await p.activity.create({ data:{ type:'SYSTEME', leadId:lead.id, contactId:c.id, content:'Lead créé (démo)' } });
  if (d.stage==='A_RAPPELER') await p.activity.create({ data:{ type:'RELANCE', leadId:lead.id, contactId:c.id, content:'Rappeler le prospect', dueAt:new Date(Date.now()-86400000), done:false } });
}
const n = await p.lead.count();
console.log('✅ Leads en base :', n);
await p.$disconnect();
