# Instructables setup Serene Sketch

#### By Britt Franken en Esteban Martinez


 [<img src="/docs/Begin%20scherm.png" alt="Foto van het begin scherm" width="800">](https://vimeo.com/952840681?share=copy)

 (klik op de afbeelding om een video te zien)

Deze installatie is ontstaan vanuit het idee om een ruimte te creëren waar iedereen tot rust kan komen. Het concept lijkt op een snoezelruimte, maar met een unieke draai:

bezoekers kunnen zelf hun omgeving vormgeven door te tekenen, waarna hun creaties de ruimte inkleden.

Snoezelruimtes worden vaak gebruikt voor personen op een buitengewone school, waarbij de personen tot rust moeten kunnen komen. Hierbij kan je denken aan personen met een verstandelijke beperking, autisme, ADHD, ... .



# Materiaal / Benodigdheden

#### Materiaal:
- Beamer
- Stoel om de beamer op te zetten
- Laptop
- Verdeelstekker
- Hdmi kabel
- Donkere ruimte
- Kussens
- Kleuren verlichting
- Knoppen (wit en blauw)
- Glazenplaat
- Camera
- Raspberry PI
- Kabels

#### Software:
- Visual Studio Code
- Basic Code Knowledge
- Open AI generator
- Github
- NodeRed
- MakerCase

#### Tools:
- Lazercutter
- Boormachine

# Stap 1

Voordat we van start kunnen gaan, moeten we eerst de GitHub-code op de computer krijgen door deze te klonen. Volg hiervoor de onderstaande stappen:

- Open de link: *[Github Serene Sketch](https://github.com/BrittFranken9/IMMI)*
- Kopieer de link die je nodig hebt vanuit de groene knop met de tekst "Code".
- Open je terminal en navigeer naar de map waarin je de code wilt klonen.
- Typ in deze map het volgende commando: `git clone` gevolgd door de gekopieerde link.
- Druk op Enter om de code te klonen.

# Stap 2

Vervolgens kan je in de terminal terug naar de map gaan waar je de code gecloned hebt en doe je `npm install`

# Stap 3

Nadat je Stap 2 hebt gedaan ga je in de terminal en geef je `npm install openai@^4.0.0` in. Dit doe je zodat je de API key van OpenAi kan gebruiken. Vanaf dat deze code is ingegeven in je terminal is alles geïnstalleerd.

Handig om op voorhand te doen:
- Een account aanmaken bij OpenAi

Dit kan je doen via volgende link:
([OpenAI](https://platform.openai.com/apps))

# Stap 4

Wanneer je account in orde is en de API-sleutel is geïnstalleerd in je terminal, kun je deze aanmaken en in de code zetten. Als je bent ingelogd bij OpenAI, krijg je de optie om ChatGPT of API te kiezen. Hier kies je voor API.

<img src="/docs/openai_apps.png" alt="apps" width="400">

Daarna ga je naar het slotje met de naam API keys.

<img src="/docs/choice.png" alt="key" width="400">

Als je daarop hebt geklikt, zie je de optie `+ Create new secret key`. Klik hierop en geef het een naam (optioneel), daarna klik je op `Create secret key`. Wanneer je dit hebt gedaan, kopieer je de sleutel en zet je deze in de code in het bestand apiKey.example.js.

<img src="/docs/api_key.png" alt="api_key" width="400">


# Stap 5

Alles in de map staat nu klaar om te starten.

Enkel nog `npm run dev` invoeren in je terminal bij de juiste map en surfen naar `http://localhost:3000/`.

# Stap 6

Nu volgt een uitleg van hoe de code in elkaar zit, onderverdeeld in vier delen: `html`, `css`, `javascript` en `Node Red`.


### html:
index.html:

De `html` is vrij eenvoudig en bestaat uit twee delen. Het eerste deel bevat het canvas, dat wordt gebruikt voor de achtergrondanimatie en de homepage. Dit canvas wordt ook gebruikt voor het laadscherm, maar dit wordt uitgelegd bij `javascript`.

<img src="/docs/canvas.png" alt="canvas" width="400">

Daarna volgt het gedeelte waar de AI-afbeelding verschijnt. Hier zijn ook andere functies te zien in het `<form>`-element, bedoeld voor het genereren van afbeeldingen met tekst. Deze functies zijn momenteel als commentaar toegevoegd en zijn niet zichtbaar op de webpagina.

<img src="/docs/image_container.png" alt="image container sizing" width="400">

loadingscreen.html:

Dit is het laadscherm dat verschijnt wanneer op de blauwe knop wordt gedrukt. Dit is al geïntegreerd in de `javascript` en kan daarom genegeerd worden. Het is hier alleen ter referentie om te laten zien hoe het laadscherm is geïmplementeerd.

### css: 

De css is ook vrij eenvoudig. Het belangrijkste zijn de stijlen voor de body en het canvas. Hierin worden voornamelijk het lettertype, de stijl en de positie van de tekst aangepast. De rest van de css is bedoeld voor het genereren van AI-afbeeldingen met tekst. Hierin worden de stijlen voor de tekst aangepast, zoals de grootte van het lettertype.

<img src="/docs/css.png" alt="css" width="400">

### javascript:

In de `javascript`-code zijn de verschillende delen getiteld zodat duidelijk is wat elk deel doet. Hier volgt een korte uitleg van de functies:

- Variabelen en imports: Hier worden de benodigde variabelen en imports (zoals de API-sleutel en stijlen) gedeclareerd.

<img src="/docs/variables.png" alt="variables" width="400">

- Image generator: In dit deel wordt de afbeelding gegenereerd. Bij `prompt` wordt beschreven wat de afbeelding moet weergeven. Hier kunnen ook de hoeveelheid en grootte van de afbeeldingen worden aangepast.

<img src="/docs/ai_generator.png" alt="ai_generator" width="400">

- WebSocket: Dit zorgt voor de verbinding tussen de Raspberry Pi en de computer.

<img src="/docs/websocket.png" alt="websocket" width="400">

- Animaties: Dit is opgedeeld in twee delen: één voor de achtergrondanimatie en één voor de laadanimatie.

<img src="/docs/animatie.png" alt="animatie" width="400">
<img src="/docs/loading_animatie.png" alt="loading_animatie" width="400">

### Node Red:

Node Red wordt gebruikt via de Raspberry Pi. Als de [Raspberry PI](https://meeplemaker.github.io/idl4-cc-rpi-install/) nog niet is geïnstalleerd, klik dan op de link voor de installatie ([Install Raspberry PI](https://meeplemaker.github.io/idl4-cc-rpi-install/)). Nadat alles is geïnstalleerd, is ook Node Red beschikbaar.

De Raspberry Pi heeft twee functies: het herkennen van twee knoppen en het maken van foto's van getekende voorwerpen. Hiervoor moeten enkele dingen in de terminal worden toegevoegd. Installeer [tensor-flow](https://flows.nodered.org/node/node-red-contrib-tensorflow) met `npm install node-red-contrib-tensorflow`. Dit zorgt ervoor dat een afbeelding kan worden beschreven met woorden. Voor de [usbcamera](https://flows.nodered.org/node/node-red-contrib-usbcamera), gebruik `npm install node-red-contrib-usbcamera` en op de Raspberry Pi terminal `sudo apt install fswebcam`. Dit zorgt ervoor dat we foto's kunnen maken met een webcam.

Maak in Node Red het onderstaande schema na door plug-ins toe te voegen voor TensorFlow, image tools en de USB-camera.

<img src="/docs/node_red.png" alt="node_red" width="400">

### Extra commentaar

In deze code wordt TensorFlow gebruikt omdat OpenAI Vision op het moment van ontwikkeling de server blokkeerde. Dit probleem kan inmiddels zijn opgelost met een update. Het is aan te raden om te controleren of dit nu werkt, aangezien TensorFlow beperkt is en niet veel objecten herkent. Beide opties zorgen ervoor dat afbeeldingen in woorden worden beschreven voor de `javascript`-code.

Er kunnen ook wijzigingen worden aangebracht in de Node Red- en WebSocket-code. Bijvoorbeeld, door ervoor te zorgen dat wanneer op de knop wordt gedrukt om een foto te maken, de laadschermanimatie direct start.

# Stap 7

<img src="/docs/Tafel%203D%20opmaak%20(1).png" alt="Foto 3D model doos" width="400">

Nu de code klaarstaat, moet de tafel gemaakt worden. Hier zie je hoe de tafel in sketchup is vormgegeven, zo weet je al ongeveer hoe hij eruit komt te zien als je de tafel in elkaar gestoken hebt.

<img src="/docs/Tafel%20makercase.png" alt="Foto van doos in illustrator" width="400">

Deze illustrator file download je en zet je op een usb stick. Vervolgens ga je deze cutten met de lazercutter. Nadat deze helemaal is gecut ga je nog enkele gaten boren om ervoor te zorgen dat je overal je kabels kan wegwerken of naar buiten kan laten komen.

# Stap 8

<img src="/docs/Tafel%20in%20elkaar%20opbouw.jpg" alt="Tafel in elkaar zetten" width="400">

Nadat de doos volledig klaar is steek je hem in elkaar, let hierbij op dat je eerst de camera goed plakt aan de onderkant van de grootste plank met het gatje in. Hier moet je opletten dat de camera in de goede richting word geplakt zodat de foto's een beetje logisch getrokken worden. De tafel in elkaar steken gebeurd zoals je op de foto ziet, en zoals je zag op de sketchup. Er is rekening gehouden met de kabels en de raspberry die in de tafel verwerkt gaat worden.

Daarnaast zoek je nog een glazenplaat die past bovenop de tafel. Deze mag niet kleiner zijn dan 31 op 32 centimeter. Zo kan deze niet in het gat vallen en kan je hem vastmaken op het tafelblad. Wij hebben dit met overschotten gedaan van het lazercutten, door deze vlka naast de plaat vast te lijmen, maar dit kan je evengoed gewoon vastlijmen of gewoon los laten liggen.

# Stap 9

Als de tafel in elkaar zit, kun je alle kabels in de tafel installeren. Verbind de Raspberry Pi met de groene plaat en plaats deze in het bovenste vakje. De groene plaat bevat verschillende kabels die ervoor zorgen dat de knoppen werken. Er is ook een batterij met kabels die ervoor zorgt dat de knoppen licht geven, wat bijdraagt aan de sfeer.

Laat alle kabels naar beneden in de doos zakken en zorg ervoor dat de beamer kan worden verbonden met zowel de Raspberry Pi als de laptop die in de tafel is ingebouwd. Er is een laptop in het onderste gedeelte van de tafel omdat de Raspberry Pi niet altijd voldoende capaciteit heeft. Plaats de beamer op een stoel voor de tafel zodat deze op de muur kan worden gericht.

Plaats ten slotte een lamp in de tafel zelf. Deze lamp is nodig om goede foto's te maken. Verberg de lamp onder het vakje waar de Raspberry Pi zich bevindt, zodat deze niet zichtbaar is. Leg ook een wit blad of een witte plaat op de tafel voordat je een foto maakt. Dit helpt om het licht te blokkeren en zorgt ervoor dat de foto goed wordt gemaakt en dat het object duidelijk zichtbaar is.

<img src="/docs/Opzet%20met%20foto.jpg" alt="Opzet van de tafel" width="400">

# Stap 10

Na het voltooien van Stap 9 ga je verder zoals je gewend bent om aan de code te werken. Koppel je laptop aan de Raspberry Pi en controleer of alle kabels zijn aangesloten (ethernetkabel, kabels naar de twee knoppen, etc.). Open vervolgens de `terminal` op je laptop en log in op de Raspberry Pi. Activeer Node Red met het commando `node-red-start`. Open daarna een nieuwe `terminal` om naar de map met de code te navigeren. Voer daar `npm run dev` uit om de lokale server te starten en open deze in een webbrowser naar keuze.

# Stap 11

Nu is het belangrijk om de ruimte donker te maken. Dit doe je door aluminiumfolie met water tegen de ramen te plakken. Hierdoor komt er geen licht meer binnen en wordt de ruimte verduisterd.

Om deze duisternis gezelliger te maken, gebruiken we gekleurde verlichting. We kiezen voor blauw-groene tinten, zodat het rustgevend is wanneer mensen binnenkomen. Daarnaast hebben we nog een helderdere lamp die ervoor zorgt dat alles goed zichtbaar is.

# Stap 12

Als allerlaatste stap doe je de aankleding van de ruimte, hier leg je kussens en/of enkele dekens om het wat knusser te maken zoals een echte snoezelruimte.

<img src="/docs/Aankleding%20ruimte.jpg" alt="Aankleding van de ruimte" width="400">
