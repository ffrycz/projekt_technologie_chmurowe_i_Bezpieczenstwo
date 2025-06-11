# projekt_technologie_chmurowe_i_Bezpieczenstwo

Projekt zaliczeniowy z przedmiotów Bezpieczeństwo aplikacji webowych i Technologie chmurowe

### Pierwszy etap

Aby uruchomić etap pierwszy należy wejść do katalogu Etap_I i wpisać:

```bash
docker compose --env-file .env up --build
```

Kiedy wszystko się uruchomi na `localhost:3000` będzie dostępny frontend aplikacji. Użytkownik nie będzie miał do niego dostęupu o ile się nie zaloguje lub nie stworzy konta. W dostępnym formularzu tworzenia konta możemy stworzyć klasyczne konto, które ma dostęp do przeglądania postów, oraz, kopiowania kodów, oraz przeszukiwania strony. Konta o roli `verified company` są tworzone przez administratora `keycloak` którego konsola jest dostępna pod adresem `localhost:8080`. Login i hasło administratora to "admin". W domyśle firmy kontaktują się z administratorem w celu nawiązania współpracy. Dostają one wtedy dostęp do konta, które umożliwia tworzenie postów na podstronie `/create`.
