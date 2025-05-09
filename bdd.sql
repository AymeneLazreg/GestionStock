/*
 Navicat Premium Dump SQL

 Source Server         : postgre
 Source Server Type    : PostgreSQL
 Source Server Version : 170003 (170003)
 Source Host           : localhost:5432
 Source Catalog        : projet
 Source Schema         : public

 Target Server Type    : PostgreSQL
 Target Server Version : 170003 (170003)
 File Encoding         : 65001

 Date: 09/05/2025 15:18:40
*/


-- ----------------------------
-- Type structure for enum_mouvement_action
-- ----------------------------
DROP TYPE IF EXISTS "public"."enum_mouvement_action";
CREATE TYPE "public"."enum_mouvement_action" AS ENUM (
  'Entrée',
  'Sortie'
);

-- ----------------------------
-- Sequence structure for CommandeFournisseurs_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."CommandeFournisseurs_id_seq";
CREATE SEQUENCE "public"."CommandeFournisseurs_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 9223372036854775807
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for LigneCommandeFournisseur_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."LigneCommandeFournisseur_id_seq";
CREATE SEQUENCE "public"."LigneCommandeFournisseur_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 9223372036854775807
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for commandes_client_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."commandes_client_id_seq";
CREATE SEQUENCE "public"."commandes_client_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for commandes_fournisseur_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."commandes_fournisseur_id_seq";
CREATE SEQUENCE "public"."commandes_fournisseur_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for lignes_commande_client_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."lignes_commande_client_id_seq";
CREATE SEQUENCE "public"."lignes_commande_client_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for lignes_commande_fournisseur_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."lignes_commande_fournisseur_id_seq";
CREATE SEQUENCE "public"."lignes_commande_fournisseur_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for mouvement_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."mouvement_id_seq";
CREATE SEQUENCE "public"."mouvement_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for produit_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."produit_id_seq";
CREATE SEQUENCE "public"."produit_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for produit_id_seq1
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."produit_id_seq1";
CREATE SEQUENCE "public"."produit_id_seq1" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for produit_id_seq2
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."produit_id_seq2";
CREATE SEQUENCE "public"."produit_id_seq2" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for produit_id_seq3
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."produit_id_seq3";
CREATE SEQUENCE "public"."produit_id_seq3" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for utilisateurs_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."utilisateurs_id_seq";
CREATE SEQUENCE "public"."utilisateurs_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Table structure for categorie
-- ----------------------------
DROP TABLE IF EXISTS "public"."categorie";
CREATE TABLE "public"."categorie" (
  "id" int4 NOT NULL,
  "nom" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "description" text COLLATE "pg_catalog"."default"
)
;

-- ----------------------------
-- Records of categorie
-- ----------------------------
INSERT INTO "public"."categorie" VALUES (1, 'Alimentaire', 'H');
INSERT INTO "public"."categorie" VALUES (2, 'Fruits', 'Fr');
INSERT INTO "public"."categorie" VALUES (3, 'Legumes', 'lg');
INSERT INTO "public"."categorie" VALUES (4, 'Épicerie salée', 'Olives, câpres, cornichons et antipasti salés');
INSERT INTO "public"."categorie" VALUES (5, 'Épicerie sucrée', 'Confitures, miels, pâtes à tartiner et sirops');
INSERT INTO "public"."categorie" VALUES (6, 'Boissons non alcoolisées', 'Eaux, jus de fruits, sodas et boissons énergétiques');
INSERT INTO "public"."categorie" VALUES (7, 'Vins', 'Vins rouges, blancs, rosés et champagnes');
INSERT INTO "public"."categorie" VALUES (8, 'Spiritueux', 'Whiskys, rhums, vodkas, gins et liqueurs');
INSERT INTO "public"."categorie" VALUES (9, 'Bières & cidres', 'Bières artisanales, industrielles et cidres');
INSERT INTO "public"."categorie" VALUES (10, 'Jus & nectars', 'Jus pressés, nectars de fruits et smoothies');
INSERT INTO "public"."categorie" VALUES (11, 'Huiles & vinaigres', 'Huiles d’olive, de tournesol et vinaigres balsamiques');
INSERT INTO "public"."categorie" VALUES (12, 'Miels & confitures', 'Miels monofloraux et confitures artisanales');
INSERT INTO "public"."categorie" VALUES (13, 'Pâtes & riz', 'Pâtes fraîches, sèches et assortiments de riz');
INSERT INTO "public"."categorie" VALUES (14, 'Farines & céréales', 'Farines de blé, d’épeautre et mélanges de céréales');
INSERT INTO "public"."categorie" VALUES (15, 'Légumineuses', 'Lentilles, pois chiches et haricots secs');
INSERT INTO "public"."categorie" VALUES (16, 'Conserves & bocaux', 'Légumes, sauces et plats cuisinés en conserve');
INSERT INTO "public"."categorie" VALUES (17, 'Surgelés', 'Fruits, légumes et plats préparés surgelés');
INSERT INTO "public"."categorie" VALUES (18, 'Produits laitiers', 'Laits, yaourts, fromages et crèmes fraîches');
INSERT INTO "public"."categorie" VALUES (19, 'Viandes & charcuterie', 'Steaks, rôtis, jambons et saucissons');
INSERT INTO "public"."categorie" VALUES (20, 'Poissons & fruits de mer', 'Filets de poisson, crevettes et coquillages');
INSERT INTO "public"."categorie" VALUES (21, 'Boulangerie & pâtisserie', 'Pain, viennoiseries et gâteaux artisanaux');
INSERT INTO "public"."categorie" VALUES (23, 'Snacks & apéritifs', 'Chips, crackers et biscuits apéritifs');
INSERT INTO "public"."categorie" VALUES (22, 'Produits bio', 'Aliments issus de l’agriculture biologique');

-- ----------------------------
-- Table structure for commandes_client
-- ----------------------------
DROP TABLE IF EXISTS "public"."commandes_client";
CREATE TABLE "public"."commandes_client" (
  "id" int4 NOT NULL DEFAULT nextval('commandes_client_id_seq'::regclass),
  "client" int4 NOT NULL,
  "date_commande" date NOT NULL DEFAULT CURRENT_DATE,
  "statut" varchar(50) COLLATE "pg_catalog"."default" DEFAULT 'En cours'::character varying,
  "montant_totale" float8 DEFAULT 0
)
;

-- ----------------------------
-- Records of commandes_client
-- ----------------------------
INSERT INTO "public"."commandes_client" VALUES (109, 24, '2025-05-09', 'Validée', 36);

-- ----------------------------
-- Table structure for commandes_fournisseur
-- ----------------------------
DROP TABLE IF EXISTS "public"."commandes_fournisseur";
CREATE TABLE "public"."commandes_fournisseur" (
  "id" int4 NOT NULL DEFAULT nextval('commandes_fournisseur_id_seq'::regclass),
  "date_commande" date NOT NULL,
  "statut" varchar(255) COLLATE "pg_catalog"."default" NOT NULL DEFAULT 'En Attente'::character varying,
  "date_validation" timestamptz(6),
  "montant_totale" float8 NOT NULL DEFAULT '0'::double precision,
  "fournisseur" int4 NOT NULL
)
;

-- ----------------------------
-- Records of commandes_fournisseur
-- ----------------------------
INSERT INTO "public"."commandes_fournisseur" VALUES (56, '2025-05-09', 'Validée', '2025-05-09 15:06:03.073+02', 163, 1);

-- ----------------------------
-- Table structure for fournisseur
-- ----------------------------
DROP TABLE IF EXISTS "public"."fournisseur";
CREATE TABLE "public"."fournisseur" (
  "id" int4 NOT NULL,
  "nom" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "adresse" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "email" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "telephone" varchar(255) COLLATE "pg_catalog"."default" NOT NULL
)
;

-- ----------------------------
-- Records of fournisseur
-- ----------------------------
INSERT INTO "public"."fournisseur" VALUES (1, 'METRO AG', 'Düsseldorf, Allemagne', ' creditorrelations@metro.de', '+49 211 6886 1904');

-- ----------------------------
-- Table structure for lignes_commande_client
-- ----------------------------
DROP TABLE IF EXISTS "public"."lignes_commande_client";
CREATE TABLE "public"."lignes_commande_client" (
  "id" int4 NOT NULL DEFAULT nextval('lignes_commande_client_id_seq'::regclass),
  "commande" int4 NOT NULL,
  "produit" int4 NOT NULL,
  "quantite" int4 NOT NULL,
  "prix_unitaire" float8 NOT NULL,
  "createdAt" timestamp(6) DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" timestamp(6) DEFAULT CURRENT_TIMESTAMP
)
;

-- ----------------------------
-- Records of lignes_commande_client
-- ----------------------------
INSERT INTO "public"."lignes_commande_client" VALUES (103, 109, 1, 4, 2.5, '2025-05-09 12:58:25.476', '2025-05-09 12:58:25.476');
INSERT INTO "public"."lignes_commande_client" VALUES (104, 109, 4, 2, 2.95, '2025-05-09 12:58:28.565', '2025-05-09 12:58:28.565');
INSERT INTO "public"."lignes_commande_client" VALUES (105, 109, 19, 1, 4.9, '2025-05-09 12:58:32.327', '2025-05-09 12:58:32.327');
INSERT INTO "public"."lignes_commande_client" VALUES (106, 109, 30, 1, 2.5, '2025-05-09 12:58:37.065', '2025-05-09 12:58:37.065');
INSERT INTO "public"."lignes_commande_client" VALUES (107, 109, 9, 1, 7.9, '2025-05-09 12:58:40.942', '2025-05-09 12:58:40.942');
INSERT INTO "public"."lignes_commande_client" VALUES (108, 109, 15, 6, 0.8, '2025-05-09 12:58:48.439', '2025-05-09 12:58:48.439');

-- ----------------------------
-- Table structure for lignes_commande_fournisseur
-- ----------------------------
DROP TABLE IF EXISTS "public"."lignes_commande_fournisseur";
CREATE TABLE "public"."lignes_commande_fournisseur" (
  "id" int4 NOT NULL DEFAULT nextval('lignes_commande_fournisseur_id_seq'::regclass),
  "produit" int4 NOT NULL,
  "quantité" int4 NOT NULL,
  "prix_unitaire" float8 NOT NULL,
  "commande" int4 NOT NULL
)
;

-- ----------------------------
-- Records of lignes_commande_fournisseur
-- ----------------------------
INSERT INTO "public"."lignes_commande_fournisseur" VALUES (64, 7, 10, 2.2, 56);
INSERT INTO "public"."lignes_commande_fournisseur" VALUES (65, 25, 5, 18, 56);
INSERT INTO "public"."lignes_commande_fournisseur" VALUES (66, 14, 10, 2.7, 56);
INSERT INTO "public"."lignes_commande_fournisseur" VALUES (67, 15, 30, 0.8, 56);
INSERT INTO "public"."lignes_commande_fournisseur" VALUES (68, 25, 5, 18, 56);
INSERT INTO "public"."lignes_commande_fournisseur" VALUES (69, 7, 10, 2.2, 56);
INSERT INTO "public"."lignes_commande_fournisseur" VALUES (70, 14, 10, 2.7, 56);
INSERT INTO "public"."lignes_commande_fournisseur" VALUES (71, 15, 30, 0.8, 56);

-- ----------------------------
-- Table structure for mouvement
-- ----------------------------
DROP TABLE IF EXISTS "public"."mouvement";
CREATE TABLE "public"."mouvement" (
  "id" int4 NOT NULL DEFAULT nextval('mouvement_id_seq'::regclass),
  "produit" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "action" "public"."enum_mouvement_action" NOT NULL,
  "quantite" int4 NOT NULL,
  "date" date NOT NULL,
  "utilisateur_id" int4
)
;

-- ----------------------------
-- Records of mouvement
-- ----------------------------
INSERT INTO "public"."mouvement" VALUES (151, 'Pain de campagne', 'Sortie', 4, '2025-05-09', 24);
INSERT INTO "public"."mouvement" VALUES (152, 'Camembert fermier', 'Sortie', 2, '2025-05-09', 24);
INSERT INTO "public"."mouvement" VALUES (153, 'Steak haché', 'Sortie', 1, '2025-05-09', 24);
INSERT INTO "public"."mouvement" VALUES (154, 'Beurre doux', 'Sortie', 1, '2025-05-09', 24);
INSERT INTO "public"."mouvement" VALUES (155, 'Vin rouge Bordeaux', 'Sortie', 1, '2025-05-09', 24);
INSERT INTO "public"."mouvement" VALUES (156, 'Eau minérale plate', 'Sortie', 6, '2025-05-09', 24);
INSERT INTO "public"."mouvement" VALUES (157, 'Vodka russe', 'Entrée', 5, '2025-05-09', 23);
INSERT INTO "public"."mouvement" VALUES (158, 'Lentilles vertes', 'Entrée', 10, '2025-05-09', 23);
INSERT INTO "public"."mouvement" VALUES (159, 'Pesto vert', 'Entrée', 10, '2025-05-09', 23);
INSERT INTO "public"."mouvement" VALUES (160, 'Eau minérale plate', 'Entrée', 30, '2025-05-09', 23);
INSERT INTO "public"."mouvement" VALUES (161, 'Chocolat noir 70%', 'Sortie', 5, '2025-05-09', 23);
INSERT INTO "public"."mouvement" VALUES (162, 'Banane', 'Entrée', 20, '2025-05-09', 23);
INSERT INTO "public"."mouvement" VALUES (163, 'Café colombia', 'Entrée', 15, '2025-05-09', 23);
INSERT INTO "public"."mouvement" VALUES (164, 'Café colombia', 'Sortie', 14, '2025-05-09', 23);
INSERT INTO "public"."mouvement" VALUES (165, 'Haricots blancs', 'Sortie', 50, '2025-05-09', 23);
INSERT INTO "public"."mouvement" VALUES (166, 'Yaourt nature', 'Sortie', 89, '2025-05-09', 23);

-- ----------------------------
-- Table structure for produit
-- ----------------------------
DROP TABLE IF EXISTS "public"."produit";
CREATE TABLE "public"."produit" (
  "id" int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1
),
  "nom" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "description" varchar(255) COLLATE "pg_catalog"."default",
  "prix" float8 NOT NULL,
  "quantite_stock" int4 NOT NULL,
  "categorie" int4 NOT NULL,
  "codebar" varchar(255) COLLATE "pg_catalog"."default",
  "image" varchar COLLATE "pg_catalog"."default"
)
;

-- ----------------------------
-- Records of produit
-- ----------------------------
INSERT INTO "public"."produit" VALUES (2, 'Jus d’orange pressé', 'Jus frais sans sucre ajouté', 3.2, 57, 10, '3274080001234', 'produit-2.png');
INSERT INTO "public"."produit" VALUES (3, 'Spaghetti complets', 'Pâtes au blé complet', 1.8, 76, 13, '3023290034567', 'produit-3.png');
INSERT INTO "public"."produit" VALUES (52, 'Café colombia', 'Café issu de la colombie bio', 4.99, 1, 1, '9876545678', '1746796511137-download.webp');
INSERT INTO "public"."produit" VALUES (17, 'Riz basmati', 'Long grain parfumé', 2.3, 70, 13, '3034567890123', 'produit-17.png');
INSERT INTO "public"."produit" VALUES (20, 'Filets de saumon', 'Élevage responsable', 9.2, 25, 20, '3067891234567', 'produit-20.png');
INSERT INTO "public"."produit" VALUES (21, 'Croissants pur beurre', 'Viennoiseries fraîches', 0.9, 64, 21, '3344556677889', 'produit-21.png');
INSERT INTO "public"."produit" VALUES (22, 'Olives noires', 'Dénoyautées à l’huile', 2.1, 48, 4, '3222223334445', 'produit-22.png');
INSERT INTO "public"."produit" VALUES (23, 'Chips nature', 'Cuites au chaudron', 1.5, 59, 23, '3300112233445', 'produit-23.png');
INSERT INTO "public"."produit" VALUES (26, 'Compote de pommes', 'Sans sucres ajoutés', 1.1, 68, 5, '3141516171819', 'produit-26.png');
INSERT INTO "public"."produit" VALUES (27, 'Céréales au miel', 'Idéal pour le petit-déjeuner', 3.4, 53, 14, '3210987654321', 'produit-27.png');
INSERT INTO "public"."produit" VALUES (28, 'Cornichons aigres-doux', 'En bocal', 1.8, 52, 4, '3021234567890', 'produit-28.png');
INSERT INTO "public"."produit" VALUES (29, 'Smoothie mangue', '100% fruits', 2.9, 47, 10, '3459012345678', 'produit-29.png');
INSERT INTO "public"."produit" VALUES (31, 'Poulet rôti', 'Prêt à manger', 7.5, 26, 19, '3223311223344', 'produit-31.png');
INSERT INTO "public"."produit" VALUES (32, 'Crevettes roses', 'Cuites et décortiquées', 8.1, 33, 20, '3109876543211', 'produit-32.png');
INSERT INTO "public"."produit" VALUES (33, 'Saucisson sec', 'Pur porc', 3.9, 41, 19, '3456789123456', 'produit-33.png');
INSERT INTO "public"."produit" VALUES (34, 'Bière IPA', 'Amertume prononcée', 3.1, 49, 9, '3771234567890', 'produit-34.png');
INSERT INTO "public"."produit" VALUES (35, 'Gin londonien', 'Sec et aromatique', 24, 21, 8, '3556789001234', 'produit-35.png');
INSERT INTO "public"."produit" VALUES (36, 'Champagne brut', 'Grande réserve', 29, 15, 7, '3077001234567', 'produit-36.png');
INSERT INTO "public"."produit" VALUES (37, 'Farine de blé', 'Type 65 pour pâtisserie', 1.1, 88, 14, '3123450001234', 'produit-37.png');
INSERT INTO "public"."produit" VALUES (38, 'Sardines à l’huile', 'En conserve', 1.6, 65, 16, '3022212345678', 'produit-38.png');
INSERT INTO "public"."produit" VALUES (39, 'Légumes grillés', 'Antipasti méditerranéens', 3.7, 39, 4, '3066009876543', 'produit-39.png');
INSERT INTO "public"."produit" VALUES (40, 'Carottes fraîches', 'Origine France', 1.2, 71, 3, '3009870001234', 'produit-40.png');
INSERT INTO "public"."produit" VALUES (41, 'Pommes Golden', 'Croquantes et sucrées', 2.1, 73, 2, '3220001112345', 'produit-41.png');
INSERT INTO "public"."produit" VALUES (42, 'Yaourt à la grecque', 'Crèmeux et onctueux', 1, 62, 18, '3045123098765', 'produit-42.png');
INSERT INTO "public"."produit" VALUES (43, 'Bio jus multifruits', 'Certifié AB', 3, 55, 22, '3033000111222', 'produit-43.png');
INSERT INTO "public"."produit" VALUES (44, 'Poêlée de légumes', 'Surgelée, prête à cuire', 2.9, 60, 17, '3123098745632', 'produit-44.png');
INSERT INTO "public"."produit" VALUES (45, 'Chocolat praliné', 'Sans huile de palme', 2.4, 51, 5, '3456783456789', 'produit-45.png');
INSERT INTO "public"."produit" VALUES (46, 'Olives vertes farcies', 'Aux poivrons rouges', 2.5, 42, 4, '3090876543211', 'produit-46.png');
INSERT INTO "public"."produit" VALUES (47, 'Sirop de menthe', 'Pour boissons fraîches', 1.9, 58, 5, '3123409871234', 'produit-47.png');
INSERT INTO "public"."produit" VALUES (48, 'Poivrons rouges', 'Frais et croquants', 1.7, 69, 3, '3090871234567', 'produit-48.png');
INSERT INTO "public"."produit" VALUES (49, 'Tofu fumé bio', 'Riche en protéines', 3.3, 36, 22, '3000765432198', 'produit-49.png');
INSERT INTO "public"."produit" VALUES (50, 'Taboulé oriental', 'Semoule, menthe et légumes', 2.7, 40, 1, '3120087654321', 'produit-50.png');
INSERT INTO "public"."produit" VALUES (1, 'Pain de campagne', 'Pain artisanal au levain naturel', 2.5, 39, 21, '3017624012345', 'produit-1.png');
INSERT INTO "public"."produit" VALUES (4, 'Camembert fermier', 'Fromage au lait cru affiné', 2.95, 20, 18, '3560070543219', 'produit-4.png');
INSERT INTO "public"."produit" VALUES (19, 'Steak haché', '100% pur bœuf', 4.9, 27, 19, '3579513579513', 'produit-19.png');
INSERT INTO "public"."produit" VALUES (30, 'Beurre doux', '250g de beurre laitier', 2.5, 60, 18, '3123012345678', 'produit-30.png');
INSERT INTO "public"."produit" VALUES (25, 'Vodka russe', 'Triple distillée', 18, 35, 8, '3000123456789', 'produit-25.png');
INSERT INTO "public"."produit" VALUES (24, 'Chocolat noir 70%', 'Tablette intense cacao', 2.9, 40, 5, '3011223344556', 'produit-24.png');
INSERT INTO "public"."produit" VALUES (16, 'Haricots blancs', 'Sec, à cuire', 2.1, 5, 15, '3012387654321', 'produit-16.png');
INSERT INTO "public"."produit" VALUES (18, 'Yaourt nature', 'Sans sucre ajouté', 0.6, 0, 18, '3296540012345', 'produit-18.png');
INSERT INTO "public"."produit" VALUES (51, 'Banane', 'Banane bio fairtrade', 1.99, 20, 2, '1234567890', 'banane.webp');
INSERT INTO "public"."produit" VALUES (5, 'Huile d’olive vierge', 'Huile bio première pression à froid', 5.4, 34, 11, '3700001234567', 'produit-5.png');
INSERT INTO "public"."produit" VALUES (6, 'Confiture de fraise', 'Confiture artisanale extra', 3.1, 40, 12, '3456789012345', 'produit-6.png');
INSERT INTO "public"."produit" VALUES (8, 'Soda cola', 'Boisson gazeuse sucrée', 1.1, 85, 6, '3175680000001', 'produit-8.png');
INSERT INTO "public"."produit" VALUES (10, 'Whisky écossais', 'Single malt 12 ans d’âge', 32, 18, 8, '3216549870001', 'produit-10.png');
INSERT INTO "public"."produit" VALUES (11, 'Bière blonde artisanale', 'Brassée en Alsace', 2.6, 75, 9, '3045320112233', 'produit-11.png');
INSERT INTO "public"."produit" VALUES (12, 'Crackers au romarin', 'Biscuits apéritifs salés', 1.9, 44, 23, '3098780006543', 'produit-12.png');
INSERT INTO "public"."produit" VALUES (13, 'Miel de lavande', 'Récolté en Provence', 4.8, 37, 5, '3009876543210', 'produit-13.png');
INSERT INTO "public"."produit" VALUES (9, 'Vin rouge Bordeaux', 'Appellation Bordeaux contrôlée', 7.9, 49, 7, '3452890002345', 'produit-9.png');
INSERT INTO "public"."produit" VALUES (7, 'Lentilles vertes', 'Lentilles du Puy AOP', 2.2, 71, 15, '3222475211234', 'produit-7.png');
INSERT INTO "public"."produit" VALUES (14, 'Pesto vert', 'Sauce italienne au basilic', 2.7, 56, 16, '3123456789012', 'produit-14.png');
INSERT INTO "public"."produit" VALUES (15, 'Eau minérale plate', 'Bouteille 1.5L', 0.8, 123, 6, '3012345678999', 'produit-15.png');

-- ----------------------------
-- Table structure for utilisateurs
-- ----------------------------
DROP TABLE IF EXISTS "public"."utilisateurs";
CREATE TABLE "public"."utilisateurs" (
  "id" int4 NOT NULL DEFAULT nextval('utilisateurs_id_seq'::regclass),
  "nom" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "email" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "mdp" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "role" varchar(255) COLLATE "pg_catalog"."default" NOT NULL DEFAULT 'Employe'::character varying
)
;

-- ----------------------------
-- Records of utilisateurs
-- ----------------------------
INSERT INTO "public"."utilisateurs" VALUES (24, 'Aymene LAZREG', 'aymenlazreg4@gmail.com', '$2b$10$dAIHAdEel1l8jezHWAQbwexjQR9pmdC0f/BSnQPfWag0sgX1Zm4YO', 'client');
INSERT INTO "public"."utilisateurs" VALUES (23, 'Administrateur', 'admin@admin.com', '$2b$10$SyDue5H0Wu9kvbhmOjlUYOyde/EgzwUwa1Gxsiac7sbhpfvvk.mua', 'admin');

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
SELECT setval('"public"."CommandeFournisseurs_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
SELECT setval('"public"."LigneCommandeFournisseur_id_seq"', 7, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."commandes_client_id_seq"
OWNED BY "public"."commandes_client"."id";
SELECT setval('"public"."commandes_client_id_seq"', 109, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."commandes_fournisseur_id_seq"
OWNED BY "public"."commandes_fournisseur"."id";
SELECT setval('"public"."commandes_fournisseur_id_seq"', 56, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."lignes_commande_client_id_seq"
OWNED BY "public"."lignes_commande_client"."id";
SELECT setval('"public"."lignes_commande_client_id_seq"', 108, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."lignes_commande_fournisseur_id_seq"
OWNED BY "public"."lignes_commande_fournisseur"."id";
SELECT setval('"public"."lignes_commande_fournisseur_id_seq"', 71, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."mouvement_id_seq"
OWNED BY "public"."mouvement"."id";
SELECT setval('"public"."mouvement_id_seq"', 166, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."produit_id_seq"
OWNED BY "public"."produit"."id";
SELECT setval('"public"."produit_id_seq"', 50, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."produit_id_seq1"
OWNED BY "public"."produit"."id";
SELECT setval('"public"."produit_id_seq1"', 7, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."produit_id_seq2"
OWNED BY "public"."produit"."id";
SELECT setval('"public"."produit_id_seq2"', 30, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."produit_id_seq3"
OWNED BY "public"."produit"."id";
SELECT setval('"public"."produit_id_seq3"', 52, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."utilisateurs_id_seq"
OWNED BY "public"."utilisateurs"."id";
SELECT setval('"public"."utilisateurs_id_seq"', 24, true);

-- ----------------------------
-- Primary Key structure for table categorie
-- ----------------------------
ALTER TABLE "public"."categorie" ADD CONSTRAINT "categorie_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table commandes_client
-- ----------------------------
ALTER TABLE "public"."commandes_client" ADD CONSTRAINT "commandes_client_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table commandes_fournisseur
-- ----------------------------
ALTER TABLE "public"."commandes_fournisseur" ADD CONSTRAINT "commandes_fournisseur_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table fournisseur
-- ----------------------------
ALTER TABLE "public"."fournisseur" ADD CONSTRAINT "fournisseur_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table lignes_commande_client
-- ----------------------------
ALTER TABLE "public"."lignes_commande_client" ADD CONSTRAINT "lignes_commande_client_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table lignes_commande_fournisseur
-- ----------------------------
ALTER TABLE "public"."lignes_commande_fournisseur" ADD CONSTRAINT "lignes_commande_fournisseur_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table mouvement
-- ----------------------------
ALTER TABLE "public"."mouvement" ADD CONSTRAINT "mouvement_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Auto increment value for produit
-- ----------------------------
SELECT setval('"public"."produit_id_seq3"', 52, true);

-- ----------------------------
-- Primary Key structure for table produit
-- ----------------------------
ALTER TABLE "public"."produit" ADD CONSTRAINT "produit_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Uniques structure for table utilisateurs
-- ----------------------------
ALTER TABLE "public"."utilisateurs" ADD CONSTRAINT "utilisateurs_email_key1" UNIQUE ("email");
ALTER TABLE "public"."utilisateurs" ADD CONSTRAINT "utilisateurs_email_key" UNIQUE ("email");

-- ----------------------------
-- Primary Key structure for table utilisateurs
-- ----------------------------
ALTER TABLE "public"."utilisateurs" ADD CONSTRAINT "utilisateurs_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Foreign Keys structure for table commandes_fournisseur
-- ----------------------------
ALTER TABLE "public"."commandes_fournisseur" ADD CONSTRAINT "commandes_fournisseur_fournisseur_fkey" FOREIGN KEY ("fournisseur") REFERENCES "public"."fournisseur" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- ----------------------------
-- Foreign Keys structure for table lignes_commande_client
-- ----------------------------
ALTER TABLE "public"."lignes_commande_client" ADD CONSTRAINT "lignes_commande_client_commande_fkey" FOREIGN KEY ("commande") REFERENCES "public"."commandes_client" ("id") ON DELETE CASCADE ON UPDATE NO ACTION;
ALTER TABLE "public"."lignes_commande_client" ADD CONSTRAINT "lignes_commande_client_produit_fkey" FOREIGN KEY ("produit") REFERENCES "public"."produit" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table lignes_commande_fournisseur
-- ----------------------------
ALTER TABLE "public"."lignes_commande_fournisseur" ADD CONSTRAINT "lignes_commande_fournisseur_commande_fkey" FOREIGN KEY ("commande") REFERENCES "public"."commandes_fournisseur" ("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "public"."lignes_commande_fournisseur" ADD CONSTRAINT "lignes_commande_fournisseur_produit_fkey" FOREIGN KEY ("produit") REFERENCES "public"."produit" ("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- ----------------------------
-- Foreign Keys structure for table mouvement
-- ----------------------------
ALTER TABLE "public"."mouvement" ADD CONSTRAINT "fk_utilisateur" FOREIGN KEY ("utilisateur_id") REFERENCES "public"."utilisateurs" ("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table produit
-- ----------------------------
ALTER TABLE "public"."produit" ADD CONSTRAINT "produit_categorie_fkey" FOREIGN KEY ("categorie") REFERENCES "public"."categorie" ("id") ON DELETE NO ACTION ON UPDATE CASCADE;
