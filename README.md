# Docker Projekti

## Yleiskuvaus tehtävästä
Tehtävän ideana oli luoda Dockerin avulla mikropalvelukäytänteen mukainen ympäristö, jonka avulla voitaisiin esitellä Docker osaamista. Tehtävässä tuli luoda webbisivuja, joilla esiteltäisiin Dockeria ja siihen liittyviä tekniikoita, sekä ominaisuuksia. Ympäristössä tuli myös olla osio käyttäjän mahdollisia muistiinpanoja varten.

## Ympäristön rakenne
Projektissa on kolme pääkomponenttia:
- **Frontend**: Käyttöliittymä, joka on toteutettu Flaskilla ja Bootstrapilla.
- **Backend**: Palvelinpuolen sovellus, joka on toteutettu Flaskilla ja käyttää PostgreSQL-tietokantaa.
- **Database**: PostgreSQL-tietokanta, joka tallentaa käyttäjän muistiinpanot.

### Docker Compose
`docker-compose.yml` -tiedostossa määritellään Docker-ympäristön rakenne. Tässä tiedostossa on määritelty seuraavat palvelut:
- **frontend**: Rakentaa Docker-imagen `./frontend`-hakemistosta ja avaa portin 3000.
- **backend**: Rakentaa Docker-imagen `./backend`-hakemistosta ja avaa portin 5000. Riippuvainen tietokantapalvelusta.
- **database**: Käyttää virallista Postgres-imagea ja määrittelee ympäristömuuttujat käyttäjälle, salasanalle ja tietokannan nimelle. Avaa portin 5432 ja määrittelee volyymin tietojen säilyttämiseksi.

## Ympäristön ajaminen ylös
Ympäristö voidaan ajaa ylös seuraavalla tavalla:

1. Siirrytään projektin juurihakemistoon, jossa `docker-compose.yml` sijaitsee.
2. Rakennetaan ja käynnistetään kontit seuraavalla komennolla:
    ```sh
    docker-compose up --build
    ```

## Ympäristön avaaminen selaimessa
Kun ympäristö on ajettu ylös, voidaan sovellus avata selaimessa `http://localhost:3000`.

## Yhteenveto
Projektissa syvennettiin osaamista Docker-konttien luomisesta ja konfiguroinnista. Projekti koostuu frontend-, backend- ja database-komponenteista, jotka määriteltiin toimimaan yhdessä Docker Composen avulla. Valmis ympäristö muodostaa verkkosivuston, joka esittelee Dockerin käyttöä ja tarjoaa samalla käyttäjille mahdollisuuden lisätä omia muistiinpanoja. Valmista projektia voitaisiin mm. käyttää esimerkkinä Dockerin opetuksessa.