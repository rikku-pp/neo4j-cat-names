// alternative import method

:auto USING PERIODIC COMMIT
LOAD CSV WITH HEADERS FROM "file:///catnames.csv" AS row
MERGE (cat:CatName{name: row.`Name`}) SET cat.transcribedName = row.`Transcription`
WITH cat, row
MERGE (c:Country{name: row.`Country Name`}) SET c.localizedName = row.`Country Name Domestic`
WITH cat, c
MERGE (cat)-[:NAMED_IN]->(c)
RETURN DISTINCT c.name, COUNT(cat)