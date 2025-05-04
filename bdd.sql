/*
 Navicat Premium Dump SQL

 Source Server         : ws
 Source Server Type    : PostgreSQL
 Source Server Version : 150008 (150008)
 Source Host           : aws-0-eu-west-3.pooler.supabase.com:6543
 Source Catalog        : postgres
 Source Schema         : public

 Target Server Type    : PostgreSQL
 Target Server Version : 150008 (150008)
 File Encoding         : 65001

 Date: 04/05/2025 21:10:59
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
-- Table structure for CartonProduit
-- ----------------------------
DROP TABLE IF EXISTS "public"."CartonProduit";
CREATE TABLE "public"."CartonProduit" (
  "id_carton" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "date_expiration" date NOT NULL,
  "quantite" varchar(255) COLLATE "pg_catalog"."default" NOT NULL
)
;

-- ----------------------------
-- Records of CartonProduit
-- ----------------------------

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
-- Table structure for client
-- ----------------------------
DROP TABLE IF EXISTS "public"."client";
CREATE TABLE "public"."client" (
  "id" int4 NOT NULL,
  "nom" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "email" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "telephone" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "adresse" varchar(255) COLLATE "pg_catalog"."default" NOT NULL
)
;

-- ----------------------------
-- Records of client
-- ----------------------------

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
INSERT INTO "public"."commandes_client" VALUES (90, 16, '2025-05-04', 'Validée', 8);
INSERT INTO "public"."commandes_client" VALUES (79, 6, '2025-05-04', 'En cours', 0);
INSERT INTO "public"."commandes_client" VALUES (80, 6, '2025-05-04', 'En cours', 0);
INSERT INTO "public"."commandes_client" VALUES (83, 8, '2025-05-04', 'Validée', 30);
INSERT INTO "public"."commandes_client" VALUES (84, 8, '2025-05-04', 'Validée', 2);
INSERT INTO "public"."commandes_client" VALUES (81, 5, '2025-05-04', 'En Attente', 0);
INSERT INTO "public"."commandes_client" VALUES (87, 5, '2025-05-04', 'En Attente', 2);
INSERT INTO "public"."commandes_client" VALUES (88, 15, '2025-05-04', 'En Attente', 0);
INSERT INTO "public"."commandes_client" VALUES (85, 8, '2025-05-04', 'Validée', 9);
INSERT INTO "public"."commandes_client" VALUES (89, 16, '2025-05-04', 'Validée', 6);

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
INSERT INTO "public"."commandes_fournisseur" VALUES (47, '2025-05-04', 'Validée', '2025-05-04 18:50:34.731+00', 300, 1);

-- ----------------------------
-- Table structure for facture
-- ----------------------------
DROP TABLE IF EXISTS "public"."facture";
CREATE TABLE "public"."facture" (
  "id" int4 NOT NULL,
  "date" date,
  "montant_totale" varchar(255) COLLATE "pg_catalog"."default",
  "statut" varchar(255) COLLATE "pg_catalog"."default",
  "commande_client" int4
)
;

-- ----------------------------
-- Records of facture
-- ----------------------------

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
INSERT INTO "public"."fournisseur" VALUES (1, 'AZERT', 'ZERTY', 'ZERTy', '34567');

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
INSERT INTO "public"."lignes_commande_client" VALUES (85, 83, 28, 15, 2, '2025-05-04 17:24:21.27', '2025-05-04 17:24:21.27');
INSERT INTO "public"."lignes_commande_client" VALUES (86, 84, 9, 1, 2, '2025-05-04 17:26:52.019', '2025-05-04 17:26:52.019');
INSERT INTO "public"."lignes_commande_client" VALUES (87, 85, 22, 1, 9, '2025-05-04 17:28:08.322', '2025-05-04 17:28:08.322');
INSERT INTO "public"."lignes_commande_client" VALUES (88, 87, 8, 1, 2, '2025-05-04 17:34:06.234', '2025-05-04 17:34:06.234');
INSERT INTO "public"."lignes_commande_client" VALUES (89, 89, 4, 3, 2, '2025-05-04 18:32:23.836', '2025-05-04 18:32:23.836');
INSERT INTO "public"."lignes_commande_client" VALUES (90, 90, 12, 2, 4, '2025-05-04 18:36:43.631', '2025-05-04 18:36:43.631');

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
INSERT INTO "public"."lignes_commande_fournisseur" VALUES (58, 17, 100, 3, 47);
INSERT INTO "public"."lignes_commande_fournisseur" VALUES (59, 17, 100, 3, 47);

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
INSERT INTO "public"."mouvement" VALUES (8, 'QQQQQQQ', 'Sortie', 1, '2025-05-04', 5);
INSERT INTO "public"."mouvement" VALUES (131, 'fraises', 'Sortie', 1, '2025-05-04', 8);
INSERT INTO "public"."mouvement" VALUES (4, 'kiwi', 'Sortie', 3, '2025-05-04', 16);
INSERT INTO "public"."mouvement" VALUES (132, 'kiwi', 'Sortie', 3, '2025-05-04', 16);
INSERT INTO "public"."mouvement" VALUES (133, 'dind', 'Sortie', 2, '2025-05-04', 16);
INSERT INTO "public"."mouvement" VALUES (134, 'OZMOO', 'Entrée', 100, '2025-05-04', 5);
INSERT INTO "public"."mouvement" VALUES (22, 'fraises', 'Sortie', 1, '2025-05-04', 8);

-- ----------------------------
-- Table structure for paiement
-- ----------------------------
DROP TABLE IF EXISTS "public"."paiement";
CREATE TABLE "public"."paiement" (
  "id" int4 NOT NULL,
  "date_paiement" date,
  "montant" float4,
  "mode_paiement" varchar(255) COLLATE "pg_catalog"."default",
  "facture" int4
)
;

-- ----------------------------
-- Records of paiement
-- ----------------------------

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
INSERT INTO "public"."produit" VALUES (17, 'OZMOO', 'chocolat', 3, 105, 1, '', NULL);
INSERT INTO "public"."produit" VALUES (11, 'volvic', 'eau', 1, 0, 1, '', NULL);
INSERT INTO "public"."produit" VALUES (1, 'mayo', 'sauce', 2, 0, 1, '4000177023556', NULL);
INSERT INTO "public"."produit" VALUES (15, 'ffffffff', 'fffffff', 1, 1, 1, '', NULL);
INSERT INTO "public"."produit" VALUES (3, 'coco', 'fruits', 2, 0, 2, '', NULL);
INSERT INTO "public"."produit" VALUES (2, 'lipton', 'boisson', 1.12, 7, 1, '', NULL);
INSERT INTO "public"."produit" VALUES (19, 'popcorn', 'tatat', 2, 0, 1, '', '1746322924124-ex4_3.png');
INSERT INTO "public"."produit" VALUES (14, 'candia', 'jus', 1, 0, 1, '', NULL);
INSERT INTO "public"."produit" VALUES (13, 'prince', 'gateaux', 2.03, 15, 1, '', NULL);
INSERT INTO "public"."produit" VALUES (16, 'bimo', 'gateau', 2, 11, 1, '', NULL);
INSERT INTO "public"."produit" VALUES (7, 'Produit X', 'Description produit X', 34, 150, 1, '', NULL);
INSERT INTO "public"."produit" VALUES (18, 'doritos', 'chips', 1.04, 9, 1, '', NULL);
INSERT INTO "public"."produit" VALUES (25, 'eau', 'vitteol', 8, 4, 1, '', '1746369251820-Capture_d_____cran_du_2025-05-04_16-22-59.png');
INSERT INTO "public"."produit" VALUES (5, 'Patate', 'Patate douce', 3, 116, 3, '', NULL);
INSERT INTO "public"."produit" VALUES (27, 'RedBUll', 'Boisson energisante', 2.8, 45, 6, '8712100751370', '1746373596350-download.webp');
INSERT INTO "public"."produit" VALUES (6, 'SDGFDF', 'é"''(-è', 12345, 240, 1, '3456789', NULL);
INSERT INTO "public"."produit" VALUES (20, 'cocacola', 'boisson', 1.13, 9, 1, '', '1746323635439-2ac6493f-d7f6-4515-9de3-86f87b12c1ad.png');
INSERT INTO "public"."produit" VALUES (10, 'cristaline', 'eau', 1, 7, 1, '', NULL);
INSERT INTO "public"."produit" VALUES (21, 'kinder bueno', 'chocolat', 2, 21, 1, '', '1746332542743-5a8d4927-b245-4370-b14d-85defc5a6e37.png');
INSERT INTO "public"."produit" VALUES (23, 'oreo', 'gateau', 2.04, 12, 1, '', '1746368571004-9d06ed7d-3586-4255-97ae-428f28d36bde.png');
INSERT INTO "public"."produit" VALUES (24, 'coca', 'cola', 2, 4, 1, '', NULL);
INSERT INTO "public"."produit" VALUES (28, 'Mangue', 'Alaska', 2, 0, 2, '3068320080000', '1746379395006-Capture_d_____cran_du_2025-05-04_16-22-59.png');
INSERT INTO "public"."produit" VALUES (26, 'eau', 'vittel', 7, 99, 1, '', '1746369286692-Capture_d_____cran_du_2025-05-04_16-22-59.png');
INSERT INTO "public"."produit" VALUES (9, 'tttt', 'tttt', 2, 2, 1, '', NULL);
INSERT INTO "public"."produit" VALUES (8, 'QQQQQQQ', 'QQ', 2, 2, 1, '', NULL);
INSERT INTO "public"."produit" VALUES (22, 'fraises', 'rondes', 9, 32, 2, '3068320080000', NULL);
INSERT INTO "public"."produit" VALUES (4, 'kiwi', 'fruit', 2, 7, 2, '', NULL);
INSERT INTO "public"."produit" VALUES (12, 'dind', 'a', 4, 4, 1, '', NULL);

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
INSERT INTO "public"."utilisateurs" VALUES (5, 'aymene LAZREG', 'aymenlazreg4@gmail.com', '$2b$10$DdWyx2VQmtD8WyqRrtRyPOstBN3YuxRjaHLsvltCfx9OBMmcX434K', 'admin');
INSERT INTO "public"."utilisateurs" VALUES (7, 'Super Admin', 'admin@admin.com', '$2b$10$TNUFukAmu97IQCm07U9aLex1QZ.4YPHLtNXMWHIj8CVFo.OkBNxB.', 'client');
INSERT INTO "public"."utilisateurs" VALUES (6, 'Yanis Dahmouche', 'yanischkopi@gmail.com', '$2b$10$nhADOJaakECYRumd1h6RF.8L.wighIr8jaGJPXPzK/qGhLgZlxm6G', 'client');
INSERT INTO "public"."utilisateurs" VALUES (14, 'AZERTYUI AZERTYUIO', 'AZERTYU@gmail.com', '$2b$10$j0LphflALlfAw8Ldp0ovaevzv1Nlevlkh6b0Zzwx05Ih0babD1XYq', 'client');
INSERT INTO "public"."utilisateurs" VALUES (15, 'SERTDYUGI DHFJGKHL', 'qiulsdfo@gmail.com', '$2b$10$ruF96CI9QjZFBBH9NrwN0.DUeC63xkvNu7.BwAyqxCq1IJCVde7Dq', 'client');
INSERT INTO "public"."utilisateurs" VALUES (11, 'lou za', 'louza@yahoo.com', '$2b$10$CgzOyeuOUipwwyrpoUFIreGbV2CAnM959XQL3PEBv2cyFYJrKODVC', 'client');
INSERT INTO "public"."utilisateurs" VALUES (10, 'alice abd', 'alice.abd@yahoo.com', '$2b$10$lsHvAjNnw3JgPdg4Iic3z.FuVbgsM3JRiR92skFDupE9.meG7UaDm', 'client');
INSERT INTO "public"."utilisateurs" VALUES (9, 'fayad hassan', 'hassanfayad@gmail.com', '$2b$10$o6UbFiGsFr6ELw346YainODpIJcK.26l1zJHs.to26jwwDiSVhWaW', 'client');
INSERT INTO "public"."utilisateurs" VALUES (8, 'abdellah dorbane', 'abdellahdorbane@gmail.com', '$2b$10$q37l5i1JU8ZWRuTJp4g0eutsmlxJbvc9GPlspVKCcK/gtc/XI81UG', 'client');
INSERT INTO "public"."utilisateurs" VALUES (13, 'qsdf qsdfqsd', 'amiralazreg1@gmail.com', '$2b$10$Bszr2hm91lYppsKNVsKdWO6zEZJUDOzlIOUOPqUUBuMNMfNXSPEeu', 'client');
INSERT INTO "public"."utilisateurs" VALUES (12, 'cece drake', 'cece.drake@yahoo.com', '$2b$10$pipnoH6Tqfe.A8vYeS6CfuASGa547jyd5KGVco2euUz.15lwtgLWO', 'gestionnaire');
INSERT INTO "public"."utilisateurs" VALUES (16, 'YREDUTIYO TDFYUGI', 'piquzdfp@qopsidfjp.oqiush', '$2b$10$bQFHgFyZy2u5huff0Xf0T.U0Q2GNznlU7Pix8nswowxQU.TVlWyL2', 'client');

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
SELECT setval('"public"."commandes_client_id_seq"', 90, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."commandes_fournisseur_id_seq"
OWNED BY "public"."commandes_fournisseur"."id";
SELECT setval('"public"."commandes_fournisseur_id_seq"', 47, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."lignes_commande_client_id_seq"
OWNED BY "public"."lignes_commande_client"."id";
SELECT setval('"public"."lignes_commande_client_id_seq"', 90, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."lignes_commande_fournisseur_id_seq"
OWNED BY "public"."lignes_commande_fournisseur"."id";
SELECT setval('"public"."lignes_commande_fournisseur_id_seq"', 59, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."mouvement_id_seq"
OWNED BY "public"."mouvement"."id";
SELECT setval('"public"."mouvement_id_seq"', 134, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."produit_id_seq"
OWNED BY "public"."produit"."id";
SELECT setval('"public"."produit_id_seq"', 21, true);

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
SELECT setval('"public"."produit_id_seq2"', 28, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."utilisateurs_id_seq"
OWNED BY "public"."utilisateurs"."id";
SELECT setval('"public"."utilisateurs_id_seq"', 16, true);

-- ----------------------------
-- Primary Key structure for table CartonProduit
-- ----------------------------
ALTER TABLE "public"."CartonProduit" ADD CONSTRAINT "CartonProduit_pkey" PRIMARY KEY ("id_carton");

-- ----------------------------
-- Primary Key structure for table categorie
-- ----------------------------
ALTER TABLE "public"."categorie" ADD CONSTRAINT "categorie_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table client
-- ----------------------------
ALTER TABLE "public"."client" ADD CONSTRAINT "client_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table commandes_client
-- ----------------------------
ALTER TABLE "public"."commandes_client" ADD CONSTRAINT "commandes_client_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table commandes_fournisseur
-- ----------------------------
ALTER TABLE "public"."commandes_fournisseur" ADD CONSTRAINT "commandes_fournisseur_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Checks structure for table facture
-- ----------------------------
ALTER TABLE "public"."facture" ADD CONSTRAINT "chk_status" CHECK (statut::text = ANY (ARRAY['paye'::character varying::text, 'impaye'::character varying::text]));

-- ----------------------------
-- Primary Key structure for table facture
-- ----------------------------
ALTER TABLE "public"."facture" ADD CONSTRAINT "facture_pkey" PRIMARY KEY ("id");

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
-- Checks structure for table paiement
-- ----------------------------
ALTER TABLE "public"."paiement" ADD CONSTRAINT "chk_payement" CHECK (mode_paiement::text = ANY (ARRAY['Carte'::character varying::text, 'Especes'::character varying::text, 'Virement'::character varying::text]));

-- ----------------------------
-- Primary Key structure for table paiement
-- ----------------------------
ALTER TABLE "public"."paiement" ADD CONSTRAINT "paiement_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Auto increment value for produit
-- ----------------------------
SELECT setval('"public"."produit_id_seq2"', 28, true);

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
-- Foreign Keys structure for table paiement
-- ----------------------------
ALTER TABLE "public"."paiement" ADD CONSTRAINT "facture" FOREIGN KEY ("facture") REFERENCES "public"."facture" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table produit
-- ----------------------------
ALTER TABLE "public"."produit" ADD CONSTRAINT "produit_categorie_fkey" FOREIGN KEY ("categorie") REFERENCES "public"."categorie" ("id") ON DELETE NO ACTION ON UPDATE CASCADE;
