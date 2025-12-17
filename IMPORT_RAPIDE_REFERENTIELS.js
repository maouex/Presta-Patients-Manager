/*
 * UTILITAIRE D'IMPORT RAPIDE DES RÉFÉRENTIELS
 *
 * Copiez ce fichier dans la console de votre navigateur (F12)
 * Puis modifiez les données ci-dessous et exécutez importerReferentiels()
 */

function importerReferentiels() {
  // ====== MODIFIEZ VOS DONNÉES ICI ======

  const mesMedecins = [
    // Exemple : { name: "Dr. Dupont", rpps: "12345678" }
    // Ajoutez vos médecins ici, un par ligne
  ];

  const mesCentres = [
    // Exemple : { name: "Centre Paris", finess: "123456789" }
    // Ajoutez vos centres ici, un par ligne
  ];

  const mesInfirmieres = [
    // Exemple : { name: "Marie Dupont", email: "marie@email.com", phone: "0123456789" }
    // Ajoutez vos infirmières ici, un par ligne
  ];

  const mesProtocoles = [
    // Exemple : { name: "Omnipod 5", description: "Pompe à insuline", frequency: "3 jours" }
    // Ajoutez vos protocoles ici, un par ligne
  ];

  // ====== NE PAS MODIFIER EN DESSOUS ======

  function generateId() {
    return 'id_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  // Ajouter les IDs
  const docs = mesMedecins.map(d => ({ id: generateId(), ...d }));
  const centers = mesCentres.map(c => ({ id: generateId(), ...c }));
  const nurses = mesInfirmieres.map(n => ({ id: generateId(), ...n }));
  const protos = mesProtocoles.map(p => ({ id: generateId(), ...p }));

  // Charger les référentiels partagés existants
  let shared = {};
  try {
    const stored = localStorage.getItem('nhc-care-shared-referentials');
    if (stored) {
      shared = JSON.parse(stored);
    }
  } catch (e) {
    console.error('Erreur lecture référentiels:', e);
  }

  // Fusionner avec les nouveaux
  shared.docs = [...(shared.docs || []), ...docs];
  shared.centers = [...(shared.centers || []), ...centers];
  shared.nurses = [...(shared.nurses || []), ...nurses];
  shared.protos = [...(shared.protos || []), ...protos];
  shared.prescriptionTemplates = shared.prescriptionTemplates || [];
  shared.shortcuts = shared.shortcuts || [];
  shared.savMessage = shared.savMessage || '';

  // Sauvegarder
  localStorage.setItem('nhc-care-shared-referentials', JSON.stringify(shared));

  console.log('✅ Import terminé !');
  console.log('📊 Référentiels importés:', {
    medecins: docs.length,
    centres: centers.length,
    infirmieres: nurses.length,
    protocoles: protos.length
  });
  console.log('🔄 Rechargez la page (F5) pour voir les changements');

  return {
    success: true,
    imported: {
      docs: docs.length,
      centers: centers.length,
      nurses: nurses.length,
      protos: protos.length
    }
  };
}

// Instructions d'utilisation
console.log(`
╔════════════════════════════════════════════════════════╗
║  UTILITAIRE D'IMPORT RAPIDE DES RÉFÉRENTIELS          ║
╚════════════════════════════════════════════════════════╝

📋 ÉTAPES :

1. Modifiez les tableaux ci-dessus avec VOS données
   - mesMedecins
   - mesCentres
   - mesInfirmieres
   - mesProtocoles

2. Exécutez : importerReferentiels()

3. Rechargez la page (F5)

4. Vos référentiels seront disponibles !

📝 EXEMPLE :

const mesMedecins = [
  { name: "Dr. Martin", rpps: "12345678" },
  { name: "Dr. Dubois", rpps: "87654321" }
];

const mesCentres = [
  { name: "Centre Paris", finess: "123456789" },
  { name: "Centre Lyon", finess: "987654321" }
];

Puis : importerReferentiels()
`);
