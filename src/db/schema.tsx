import { pgTable, serial, text } from "drizzle-orm/pg-core";

export const floraTable = pgTable("flora_nl", {
  id: serial("id").primaryKey(),
  latinname: text("latin_name").notNull(),
  englishname: text("english_name"),
  dutchname: text("dutch_name"),
  planttype: text("plant_type"),
  edibility: text("eet_baar"),
  flowering: text("bloei_tijd"),
  flowercolor: text("bloem_kleur"),
  evergreen: text("groen_blijvend"),
  endemic: text("in_heems"),
  endangered: text("be_dreigd"),
});

