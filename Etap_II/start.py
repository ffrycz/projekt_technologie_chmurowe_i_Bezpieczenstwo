import subprocess
import sys
from time import sleep

directories = [
    "api/",
    "db/",
    "frontend/",
    "keycloak/",
    "keycloak-db/"
]

def start():
    for directory in directories:
        print(f"Startuję {directory}...")
        subprocess.run(["kubectl", "apply", "-f", directory], check=True)
    print("Zaczekaj chwilę na pełne uruchomienie wszystkiego...")
    sleep(15.0)
    print("Teraz powinno już działać.")

def stop():
    for directory in directories:
        print(f"Zamykam {directory}...")
        subprocess.run(["kubectl", "delete", "-f", directory], check=True)



if sys.argv[1] == "1":
    start()
else:
    stop()

