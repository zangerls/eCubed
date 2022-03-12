# eCubed - eine IIoT Sensorplattform

Dieses Repo enthält den gesamten Umfang meiner 2020/21 Diplomarbeit für meine Ausbildung zum Wirtschaftsingenieur auf der HTL Ungargasse, 1030 Wien.

Viele Abschnitte des Projektablaufs und der Entwicklung werden hier beschrieben. Sind Sie jedoch mehr an den Details interessiert, empfehle ich die [offizielle Dokumentation](https://github.com/zangerls/eCubed/blob/main/Dokumentation/eCubed%20Dokumentation.pdf) zu lesen.

## 1 - Die Hardware

Die Daten für die Applikation kommen von einem [FWR30 Micropilot](https://www.at.endress.com/de/messgeraete-fuer-die-prozesstechnik/fuellstandssensor/radar-level-micropilot-fwr30?t.tabId=product-overview) von Endress+Hauser. Der Micropilot überträgt seine Messwerte (Füllstand, Temperatur, Neigungswinkel, ..) mittels 4G Übertragungsstandard bzw. 2G Fallback in die Netilion Cloud. Innerhalb der Netilion Umgebung ist ein integriertes Dashboard vorhanden, es ist dem Nutzer aber auch möglich, mithilfe des Netilion APIs die Daten außerhalb der nativen Umgebung zu nutzen.

## 2 - Beschreibung

Das Ziel von eCubed ist es, eine Webapplikation zu entwickeln, welche es dem Nutzer ermöglicht, seine Messdaten auf jedem Gerät, sei es sein Handy, PC oder Smartwatch, jederzeit ansehen zu können.

Sämtliche Informationen werden zusätzlich in Form von interaktiven Diagrammen für einfachere Interpretation der Daten visualisiert. Ebenso werden mithilfe von selbstprogrammierten Algorithmen komplexe Berechnungen für Werte wie der Standardabweichung der Temperatur und geschätzte Tage bis zum Mindestfüllstand ermittelt.

Ein großer Teil des Projekts ist der cuBot One – unser selbstentwickelter persönlicher Assistent für die Prozessanlage des Nutzers.

Dieser unterstützt den User dabei, sein Serviceteam über gefährliche Messwerte, Ausfälle der Sensorplattform und ähnliches zu informieren, indem er entweder automatisiert oder auf Wunsch des Nutzers die angemessene Nachricht per Telegram an das Team sendet.

Zusätzlich kann cuBot One sich mit dem User unterhalten und ihm Auskünfte über seine Prozessanlage liefern. Dies geschieht, indem man einem Gerät mit Google Assistant installiert sagt, man möchte mit cuBot One reden. Diesen kann man dann mit natürlicher Sprache fragen, ob die Sensorplattform aktiv ist, welche Werte sie misst und vieles mehr, worauf er mit den passenden Informationen antwortet.

## 3 - Konzept

![Konzept](https://user-images.githubusercontent.com/66888655/158031995-a3eac408-42cc-4d01-9a33-dc5627f188b8.png)

1. Prozessanlage
2. Micropilot FWR30
3. Netilion Umgebung
4. Frontend & Backend
5. Telegram API
6. Google Assistant
7. Firebase
8. End User

### 3.1 - Ablauf

Der Micropilot FWR30 (2) misst in stündlichen Intervallen die Daten der Prozessanlage (1) und sendet sämtliche Werte an das Netilion Ökosystem (3). Diese werden dort gespeichert und über Get-Requests an unser Programm (4) gesendet. Wenn unser persönlicher Assistent cuBot One eine Telegramnachricht (5) sendet, geschieht dies über eine Get-Request mit der passenden URL innerhalb unserer Softwareumgebung (4) an unseren Server, welcher die Nachricht an das Gerät des Nutzers (8) schickt. Wenn der Nutzer (8) per Google Assistant (6) auf cuBot One zugreift, greift der Assistent auf den WebHook in Firebase (7) zu, um die passende Antwort geben zu können.

## 4 - UX Entwicklung

Die Nutzererfahrung ist ein sehr komplexes Thema, weil sie bei der Verwendung eines digitalen Produkts, jegliche Bedürfnisse eines Nutzers deckt. Unser Ziel ist es, die Erfahrung des Nutzers zu verbessern und ihm so schnell wie möglich das Erreichen des gewünschten Ziels zu gewährleisten. Nutzer sind meistens faul und verlieren das Interesse, wenn sie ihren Weg nicht finden, deswegen kümmern wir uns darum, dass unser Produkt gut zu benutzen ist.

Der Ablauf unserer Entwicklung der User Experience (Nutzungserlebnis) wurde aufgeteilt in vier Hauptkategorien. Auch diese wurden ebenfalls unterteilt, um sicherzustellen, alle Punkte zu behandeln und die UX so angenehm und intuitiv für den Nutzer zu erzeugen, da dies einer der wichtigsten Faktoren für das Projekt war.

Die Abschnittsunterteilung der User Experience Entwicklung war:
* Forschung
* Brainstorming
* Implementierung
* Berichterstattung

Einige Prototypen des User Interfaces können Sie in der [Adobe XD Datei](https://github.com/zangerls/eCubed/blob/main/Dokumentation/eCubed%20Mockups.xd) widerfinden.

## 5 - Software

### 5.1 - Übersicht

Die Applikation besteht aus drei Hauptsystemen, welche essenziell für das Gesamtprojekt sind.
* Webapplikation für den User (Front- und Backend)
* Google Assistant
* Netilion

Diese drei Komponenten erfüllen ihre Aufgaben über verschiedene Plattformen und laufen in dem Endprodukt eCubed zu einem nahtlosen Gesamtbild
zusammen.

Alle drei Bestandteile haben eine direkte Verbindung zu mindestens einem weiteren. So greift die Applikation für die Daten auf die Netilion Cloud zu. Auch der Google Assistant empfängt seine Daten von dieser.

### 5.2 - Frontend

Für das Frontend wurde die JS Template-Engine Handlebars verwendet. Hier ist ein Ausschnitt des Frontends der Homepage.
```html
<!-- FULL PAGES -->
    <section class="section level">
        <h5 class="text text-center subHeading">Current Level</h5>
        <h1 class="heading text-center display-3">{{hLevel}}</h1>
        <a href="/level"><button type="button" class="btn btn-outline-light">Check details</button></a>
    </section>

    <section class="section temperature">
        <h5 class="text text-center subHeading">Current Temperature</h5>
        <h1 class="heading text-center display-3">{{hTemperature}}</h1>
        <a href="/temperature"><button type="button" class="btn btn-outline-light">Check details</button></a>
    </section>

    <section class="section distance">
        <h5 class="text text-center subHeading">Current Distance</h5>
        <h1 class="heading text-center display-3">{{hDistance}}</h1>
        <a href="/distance"><button type="button" class="btn btn-outline-light">Check details</button></a>
    </section>

    <section class="section location">
        <h5 class="text text-center subHeading">Current Outside Temperature</h5>
        <h1 class="heading text-center display-3">{{hOutTemp}}</h1>
        <a href="/misc"><button type="button" class="btn btn-outline-light">Check details</button></a>
    </section>
```

### 5.3 - Backend

