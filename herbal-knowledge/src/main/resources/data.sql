CREATE SEQUENCE IF NOT EXISTS herbal.category_seq
  INCREMENT 1
  MINVALUE 1
  MAXVALUE 9999999999
  START 1
  CACHE 1;
ALTER TABLE herbal.category_seq
  OWNER TO postgres;
  
CREATE SEQUENCE IF NOT EXISTS herbal.flower_seq
  INCREMENT 1
  MINVALUE 1
  MAXVALUE 9999999999
  START 1
  CACHE 1;
ALTER TABLE herbal.flower_seq
  OWNER TO postgres;
  
INSERT INTO herbal.category (id, name) VALUES(1, 'ground');
INSERT INTO herbal.category (id, name) VALUES(2, 'water');

INSERT INTO herbal.flower (id, name, description, category_id) VALUES(1, 'trollius', 'Trollius is a genus of about 30 species of flowering plants closely related to Ranunculus, in the family Ranunculaceae. The common name of some species is globeflower[1] or globe flower. Native to the cool temperate regions of the Northern Hemisphere, with the greatest diversity of species in Asia, Trollius usually grow in heavy, wet clay soils.', 1
)