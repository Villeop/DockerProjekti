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
Tässä projektissa opittiin luomaan ja konfiguroimaan Docker-kontteja, sekä käyttämään Docker Composea monikonttisen ympäristön hallinnassa. Projekti sisältää frontendin, backendin ja tietokannan, jotka kommunikoivat keskenään Docker-verkon avulla. Käyttäjän muistiinpanot tallennetaan tietokantaan ja niitä voidaan hallita käyttöliittymän kautta.