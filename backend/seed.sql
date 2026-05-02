-- ============================================
-- SCRIPT D'INSERTION DE 20 RECETTES
-- ============================================

INSERT INTO `recettes` (`nom`, `description`, `ingredients`, `etapes`, `auteur`, `categorie`, `temps`, `portions`, `photo`, `createdAt`, `updatedAt`) VALUES

-- ENTRÉES (5)
('Salade Niçoise', 'Salade fraîche avec thon, oeufs et olives', 'Salade laitue\nThon en conserve\nOeufs durs\nTomates\nOlives noires\nOignons rouges\nAnchois', 'Laver la laitue\nCouper les tomates\nCuire les oeufs\nMélanger tous les ingrédients\nAjouter la vinaigrette', 'Grand-mère', 'entree', '15 min', 4, NULL, NOW(), NOW()),

('Soupe à l\'Oignon', 'Soupe gratinée française classique', 'Oignons\nBouillon de boeuf\nBeurre\nPain\nFromage Gruyère\nSel et poivre', 'Émincer les oignons\nLes faire revenir au beurre\nAjouter le bouillon\nLaisser cuire 30 min\nMettre le pain et fromage sur le dessus\nGratiner au four', 'Maman', 'entree', '45 min', 4, NULL, NOW(), NOW()),

('Œufs Mayonnaise', 'Oeufs durs avec mayonnaise maison', 'Oeufs\nJaunes d\'oeufs\nHuile\nVinaigre blanc\nMoutarde\nSel et poivre', 'Cuire les oeufs\nFaire la mayonnaise\nCouper les oeufs en deux\nGarnir de mayonnaise', 'Tante Marie', 'entree', '20 min', 4, NULL, NOW(), NOW()),

('Crevettes à l\'Ail', 'Crevettes sautées à l\'ail et persil', 'Crevettes fraîches\nAil\nPersil frais\nHuile d\'olive\nCitron\nSel et poivre', 'Nettoyer les crevettes\nFaire revenir l\'ail\nAjouter les crevettes\nCuire 3-4 minutes\nAjouter le persil et citron', 'Chef Pierre', 'entree', '12 min', 4, NULL, NOW(), NOW()),

('Foie Gras Terrine', 'Terrine de foie gras maison', 'Foie gras\nSal\nPoivre\nCognac\nEpices', 'Laisser le foie gras à température ambiante\nAjouter les épices\nMettre en terrine\nCuire au bain-marie\nLaisser refroidir', 'Grand Chef', 'entree', '120 min', 6, NULL, NOW(), NOW()),

-- PLATS (8)
('Coq au Vin', 'Coq braisé au vin rouge', 'Coq\nVin rouge\nLardons\nOignons\nChampignons\nGarni\nBouillon', 'Faire revenir les lardons\nAjouter le coq doré\nVerser le vin\nAjouter les légumes\nCuire 2h à couvert', 'Grand-mère', 'plat', '150 min', 6, NULL, NOW(), NOW()),

('Pâtes Carbonara', 'Pâtes à la crème et bacon', 'Pâtes\nOeufs\nBacon\nParmesan\nSel et poivre', 'Faire bouillir l\'eau\nCuire les pâtes\nFaire revenir le bacon\nMélanger les oeufs\nCombiner tout\nAjouter le fromage', 'Maman', 'plat', '20 min', 4, NULL, NOW(), NOW()),

('Boeuf Bourguignon', 'Ragoût de boeuf au vin', 'Boeuf\nVin rouge\nCarottes\nOignons\nChampignons\nBouillon\nTomate', 'Faire revenir le boeuf\nAjouter les légumes\nVerser le vin et bouillon\nCuire 3h à couvert\nGarnir de persil', 'Tante Marie', 'plat', '200 min', 6, NULL, NOW(), NOW()),

('Risotto aux Champignons', 'Riz crémeux aux champignons', 'Riz Arborio\nChampignons\nOignon\nBouillon chaud\nVin blanc\nParmesan\nBeurre', 'Faire revenir l\'oignon\nAjouter le riz\nVerser le vin\nAjouter le bouillon progressivement\nMélanger régulièrement\nAjouter beurre et fromage', 'Chef', 'plat', '30 min', 4, NULL, NOW(), NOW()),

('Poulet Rôti', 'Poulet rôti simple et succulent', 'Poulet entier\nHerbes de Provence\nBeurre\nAil\nCitron\nSel et poivre', 'Préparer le poulet\nLe badigeonner de beurre\nAjouter les herbes et ail\nRôtir 1h30\nLaisser reposer 10 min', 'Grand-mère', 'plat', '120 min', 6, NULL, NOW(), NOW()),

('Moules Marinières', 'Moules à la crème et vin blanc', 'Moules\nVin blanc\nEchalotes\nBeurre\nCrème fraîche\nPersil', 'Nettoyer les moules\nFaire revenir les échalotes\nAjouter les moules\nVerser le vin\nCuire jusqu\'à ouverture\nAjouter la crème', 'Chef Bretagne', 'plat', '25 min', 4, NULL, NOW(), NOW()),

('Steak Frites', 'Entrecôte avec frites croustillantes', 'Entrecôte\nPommes de terre\nHuile\nSel\nPoivre\nBeurre', 'Peler les pommes de terre\nCouper en bâtons\nFrire 2 fois\nCuire le steak\nAssaisonner', 'Papa', 'plat', '45 min', 2, NULL, NOW(), NOW()),

('Cassoulet Toulousain', 'Ragoût de haricots et confit', 'Haricots blancs\nConfit de canard\nSaucisse\nOignons\nAil\nBouillon', 'Tremper les haricots\nLes cuire\nAjouter le confit et saucisse\nCuire 1h\nLaisser croûter au four', 'Grand-mère du Sud', 'plat', '240 min', 8, NULL, NOW(), NOW()),

-- DESSERTS (5)
('Crème Brûlée', 'Crème anglaise avec sucre caramélisé', 'Lait entier\nJaunes d\'oeufs\nSucre\nVanille\nSel', 'Faire bouillir le lait\nMélanger jaunes et sucre\nTemp érature basse\nCuire au bain-marie\nRefroidir et caraméliser', 'Chef Pâtissier', 'dessert', '45 min', 4, NULL, NOW(), NOW()),

('Tarte aux Pommes', 'Tarte classique aux pommes caramélisées', 'Pâte brisée\nPommes\nSucre\nBeurre\nCanelle\nOeufs', 'Préparer la pâte\nCuire à blanc\nPréparer les pommes\nMettres sur la pâte\nCuire 35 min', 'Grand-mère', 'dessert', '90 min', 6, NULL, NOW(), NOW()),

('Mousse au Chocolat', 'Mousse légère et aérée', 'Chocolat noir\nOeufs\nSucre\nCrème fraîche\nSel', 'Faire fondre le chocolat\nMélanger jaunes et sucre\nMonter les blancs\nMélanger délicatement\nRefroidir 2h', 'Chef', 'dessert', '30 min', 4, NULL, NOW(), NOW()),

('Mille-feuille', 'Pâte feuilletée avec crème', 'Pâte feuilletée\nCrème pâtissière\nSucre glace\nChocolat', 'Cuire la pâte feuilletée\nPréparer la crème\nAssembler les couches\nGlacer le dessus\nDécorer', 'Pâtissier', 'dessert', '60 min', 6, NULL, NOW(), NOW()),

('Île Flottante', 'Meringue sur crème anglaise', 'Oeufs\nSucre\nLait\nVanille', 'Monter les blancs\nFormer les meringues\nLes pocher\nPréparer la crème anglaise\nDresser', 'Grand-mère', 'dessert', '40 min', 4, NULL, NOW(), NOW()),

-- BOISSONS (2)
('Vin Chaud', 'Vin rouge épicé et chaud', 'Vin rouge\nCannelle\nClous de girofle\nAnis étoilé\nOrange\nMiel', 'Verser le vin\nAjouter les épices\nChauffer sans bouillir\nLaisser infuser 10 min\nAjouter le miel', 'Grand-mère', 'boisson', '15 min', 4, NULL, NOW(), NOW()),

('Sangria Espagnole', 'Vin blanc avec fruits frais', 'Vin blanc\nOrange\nCitron\nFraises\nMelon\nSucre\nCanelle', 'Couper les fruits\nMélanger avec le vin\nAjouter le sucre\nLaisser reposer 2h\nServir frais', 'Tante Maria', 'boisson', '130 min', 8, NULL, NOW(), NOW());