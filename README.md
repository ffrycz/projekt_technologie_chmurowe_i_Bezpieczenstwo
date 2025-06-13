# projekt_technologie_chmurowe_i_Bezpieczenstwo

Projekt zaliczeniowy z przedmiotów Bezpieczeństwo aplikacji webowych i Technologie chmurowe

### Opis dizałania

Kiedy wszystko się uruchomi na `localhost:3000` będzie dostępny frontend aplikacji. Użytkownik nie będzie miał do niego dostępu o ile się nie zaloguje lub nie stworzy konta. W dostępnym formularzu tworzenia konta możemy stworzyć klasyczne konto, które ma dostęp do przeglądania postów, oraz, kopiowania kodów, oraz przeszukiwania strony wpisując nazwy firm w pasku przeszukiwania. Konta o roli `verified_company` są tworzone przez administratora `keycloak` którego konsola jest dostępna pod adresem `localhost:8080`. Login i hasło administratora to "admin". W domyśle firmy kontaktują się z administratorem w celu nawiązania współpracy. Dostają one wtedy dostęp do konta, które umożliwia tworzenie postów na podstronie `/create`.

### Ważne!

Przy pierwszym uruchomieniu którejgoś etapu należy w części keycloak dodać do komendy startującej flagę `--import-realm` która spowoduje zaimportowanie danych realmu. Flagę należy usunąć przy kolejnym uruchomieniu.

### Pierwszy etap

Aby uruchomić etap pierwszy należy wejść do katalogu Etap_I i wpisać:

```bash
docker compose --env-file .env up --build
```

Pojawienie się logu "INFO [io.quarkus] (main) Installed features: [agroal, cdi, hibernate-orm, jdbc-postgresql, keycloak, narayana-jta, opentelemetry, reactive-routes, rest, rest-jackson, smallrye-context-propagation, vertx]" oznacza pełne uruchomienie keycloak a zarazem jeśli wszystko poszło dobrze pełne uruchomienie.

### Drugi etap

Aby uruchomić drugi etap projektu należy użyć skryptu `start.py` za pomocą komendy

```bash
python3 start.py 1
```

Argument '1' lub 'on' oznacza tutaj uruchomienie wszystkiego. Użycie argumentu '0' lub 'off' będzie oznaczało wyłączenie.

W tym przypadku nie mamy podglądu logów dlatego skrypt odczekuje 30s na pełne uruchomienie wszystkiego. Ten czas może jednak zależnie od wielu czynników być za długi lub za krutki.

##### Opracowanie:

#### Franciszek Frycz
