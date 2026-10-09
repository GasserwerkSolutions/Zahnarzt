// Grundlage: Seitennormalisierung vom 09.10.2026 und bestehende Praxiswebsite.
// Unbestätigte Angaben werden bewusst nicht als Fakten ergänzt.
export const site = {
  name: "Zahnärztehaus Arch",
  domain: "https://zahnaerztehaus-arch.ch",
  phoneLabel: "032 679 37 88",
  phoneHref: "tel:+41326793788",
  email: "info@zahnaerztehaus-arch.ch",
  address: ["Bürenstrasse 13", "3296 Arch"],
};
export const treatments = [
  {
    "slug": "prophylaxe-vorsorge",
    "title": "Prophylaxe & Vorsorge",
    "short": "Kontrolle, professionelle Zahnreinigung und individuelle Vorsorge.",
    "lead": "Regelmässige Kontrollen und professionelle Reinigung helfen, Veränderungen früh zu erkennen und die Mundgesundheit zu erhalten.",
    "decision": "Sie möchten Ihre Zähne und Ihr Zahnfleisch kontrollieren oder reinigen lassen.",
    "image": "/assets/images/behandlung-team.webp",
    "imageAlt": "Behandlungssituation in der Zahnarztpraxis",
    "sections": [
      {
        "heading": "Kontrolle und professionelle Zahnreinigung",
        "paragraphs": [
          "Bei der Kontrolluntersuchung werden Zähne und Zahnfleisch untersucht. Eine professionelle Zahnreinigung dient dazu, Beläge und Verfärbungen zu entfernen.",
          "Welche Massnahmen für Sie sinnvoll sind, besprechen wir anhand Ihrer individuellen Zahnsituation."
        ]
      },
      {
        "heading": "Ergänzende Vorsorge",
        "bullets": [
          "Individuelle Hinweise zur Mundhygiene",
          "Fluoridierung bei entsprechender Indikation",
          "Fissurenversiegelung, besonders bei Kindern und Jugendlichen",
          "Beurteilung möglicher Hinweise auf Zahnfleischerkrankungen"
        ]
      }
    ],
    "related": [
      "parodontitis",
      "kinderzahnheilkunde"
    ]
  },
  {
    "slug": "notfall",
    "title": "Zahnärztlicher Notfall",
    "short": "Bei Zahnschmerzen oder einem Zahnunfall zuerst telefonisch melden.",
    "lead": "Bei akuten Zahnbeschwerden ist ein Telefonanruf der richtige erste Schritt. Die Praxis kann dann einschätzen, wie weiter vorzugehen ist.",
    "decision": "Sie haben akute Beschwerden und benötigen eine Einschätzung.",
    "urgent": true,
    "sections": [
      {
        "heading": "Wann Sie uns anrufen sollten",
        "bullets": [
          "Akute oder starke Zahnschmerzen",
          "Abgebrochener oder gelockerter Zahn",
          "Schwellung oder akute Entzündung im Mundbereich",
          "Unfall mit einem ausgeschlagenen Zahn"
        ]
      },
      {
        "heading": "Was die Praxis klärt",
        "paragraphs": [
          "Am Telefon kann das Team die Dringlichkeit Ihres Anliegens einordnen und besprechen, welche Versorgung im Rahmen der Möglichkeiten der Praxis infrage kommt.",
          "Ein ausgefülltes Kontaktformular ersetzt bei akuten Beschwerden keinen Telefonanruf."
        ]
      },
      {
        "heading": "Wenn die Praxis nicht erreichbar ist",
        "paragraphs": [
          "Wenn die Praxis nicht erreichbar ist, finden Sie den für Ihren Wohnort zuständigen zahnärztlichen Notfalldienst bei SSO Bern. Warten Sie bei akuten Beschwerden nicht auf eine Antwort per E-Mail."
        ]
      }
    ],
    "related": [
      "zahnerhalt",
      "wurzelkanalbehandlung"
    ]
  },
  {
    "slug": "zahnerhalt",
    "title": "Zahnerhalt & Zahnreparatur",
    "short": "Beschädigte eigene Zähne versorgen und stabilisieren.",
    "lead": "Bei Karies, beschädigten Füllungen oder geschwächten Zähnen hängt die geeignete Versorgung davon ab, wie viel gesunde Zahnsubstanz erhalten ist.",
    "decision": "Sie möchten einen vorhandenen Zahn reparieren oder erhalten.",
    "image": "/assets/images/detail-fuersorge.webp",
    "imageAlt": "Detail einer zahnärztlichen Behandlung",
    "sections": [
      {
        "heading": "Füllungen und kleinere Reparaturen",
        "paragraphs": [
          "Zahnfarbene Kompositfüllungen werden zur Versorgung kariöser oder beschädigter Zähne eingesetzt. Bestehende Amalgamfüllungen können nach individueller Beurteilung ersetzt werden.",
          "Empfindliche Zahnhälse oder Zahnhalsdefekte können je nach Befund mit Lacken, Versiegelungen oder Füllungen versorgt werden."
        ]
      },
      {
        "heading": "Wenn eine Füllung nicht ausreicht",
        "paragraphs": [
          "Bei stärker geschwächten Zähnen kommen Teilkronen oder Kronen infrage. Ob eine solche Versorgung sinnvoll ist, ergibt sich aus dem konkreten Zustand des Zahns."
        ]
      },
      {
        "heading": "Wenn der Zahnnerv betroffen ist",
        "paragraphs": [
          "Für Entzündungen im Zahninneren gibt es eine eigenständige Behandlungsentscheidung. Dazu finden Sie nähere Informationen unter Wurzelkanalbehandlung."
        ]
      }
    ],
    "related": [
      "wurzelkanalbehandlung",
      "zahnersatz"
    ]
  },
  {
    "slug": "wurzelkanalbehandlung",
    "title": "Wurzelkanalbehandlung",
    "short": "Möglichkeiten zum Erhalt eines Zahns bei Problemen im Zahninneren.",
    "lead": "Ist der Zahnnerv entzündet oder abgestorben, kann eine Wurzelkanalbehandlung dazu dienen, den betroffenen Zahn zu erhalten.",
    "decision": "Sie möchten wissen, ob ein Zahn trotz Problemen am Zahnnerv erhalten werden kann.",
    "sections": [
      {
        "heading": "Wann eine Behandlung Thema wird",
        "paragraphs": [
          "Eine Wurzelkanalbehandlung kommt bei Entzündungen oder Schädigungen des Zahninneren in Betracht. Die geeignete Versorgung wird nach Untersuchung des Zahns beurteilt."
        ]
      },
      {
        "heading": "Wiederholungsbehandlung (Revision)",
        "paragraphs": [
          "Treten an einem bereits wurzelbehandelten Zahn erneut Probleme auf, kann die bestehende Wurzelfüllung im Einzelfall überprüft und eine Revision erwogen werden."
        ]
      },
      {
        "heading": "Was vor der Entscheidung geklärt wird",
        "paragraphs": [
          "Ob die Behandlung möglich und sinnvoll ist, wie die anschliessende Zahnversorgung aussieht und welcher Aufwand entsteht, lässt sich erst anhand des Befundes besprechen."
        ]
      }
    ],
    "related": [
      "zahnerhalt",
      "notfall"
    ]
  },
  {
    "slug": "parodontitis",
    "title": "Parodontitis & Zahnfleisch",
    "short": "Zahnfleisch und Zahnhalteapparat untersuchen und behandeln.",
    "lead": "Blutendes oder geschwollenes Zahnfleisch kann auf eine Erkrankung des Zahnhalteapparats hinweisen. Eine Untersuchung schafft Klarheit.",
    "decision": "Sie möchten Zahnfleischbeschwerden oder eine festgestellte Parodontitis abklären lassen.",
    "sections": [
      {
        "heading": "Wie die Situation untersucht wird",
        "paragraphs": [
          "Bei der Abklärung werden unter anderem das Zahnfleisch, die Tiefe der Zahnfleischtaschen und gegebenenfalls die Lockerung von Zähnen beurteilt. Ergänzend können Röntgenbilder erforderlich sein."
        ]
      },
      {
        "heading": "Mögliche Behandlungsschritte",
        "paragraphs": [
          "Zur Behandlung gehört je nach Befund die Reinigung ober- und unterhalb des Zahnfleischrands sowie der Wurzeloberflächen. Zusätzliche Massnahmen können individuell erforderlich werden."
        ]
      },
      {
        "heading": "Nachsorge und Vorbeugung",
        "paragraphs": [
          "Mundhygiene, professionelle Reinigung und regelmässige Kontrollen sind wichtige Bestandteile der weiteren Betreuung. Die Häufigkeit wird individuell besprochen."
        ]
      }
    ],
    "related": [
      "prophylaxe-vorsorge"
    ]
  },
  {
    "slug": "zahnersatz",
    "title": "Zahnersatz",
    "short": "Möglichkeiten, fehlende Zähne zu ersetzen.",
    "lead": "Fehlt ein Zahn oder fehlen mehrere Zähne, kommen unterschiedliche Formen von Zahnersatz infrage. Welche Lösung passt, hängt von Ihrer Zahnsituation, Ihren Wünschen und den Kosten ab.",
    "decision": "Sie möchten eine Zahnlücke oder mehrere fehlende Zähne versorgen.",
    "image": "/assets/images/patientin-senior.webp",
    "imageAlt": "Patientin im Gespräch in der Praxis",
    "sections": [
      {
        "heading": "Festsitzende Möglichkeiten",
        "paragraphs": [
          "Zahnbrücken können eine oder mehrere Zahnlücken schliessen. Auch eine implantatgetragene Krone kann als Zahnersatz infrage kommen. Die Eignung muss individuell geprüft werden."
        ]
      },
      {
        "heading": "Herausnehmbarer Zahnersatz",
        "paragraphs": [
          "Teilprothesen ersetzen mehrere fehlende Zähne. Vollprothesen sind eine Möglichkeit bei vollständigem Zahnverlust in einem Kiefer."
        ]
      },
      {
        "heading": "Die passende Variante auswählen",
        "paragraphs": [
          "Die Wahl hängt von der verbliebenen Zahnsituation, ästhetischen Vorstellungen und dem finanziellen Rahmen ab. Ein Kostenplan kann erst nach Abklärung erstellt werden.",
          "Kronen zur Stabilisierung eines noch vorhandenen Zahns behandeln wir thematisch unter Zahnerhalt."
        ]
      }
    ],
    "related": [
      "implantatberatung",
      "zahnerhalt"
    ]
  },
  {
    "slug": "implantatberatung",
    "title": "Implantatberatung",
    "short": "Eignung, Alternativen und Planung klären.",
    "lead": "Vor einer möglichen Implantatversorgung steht die Untersuchung und Beratung. Dabei werden Voraussetzungen, Alternativen und ein individueller Plan besprochen.",
    "decision": "Sie erwägen Implantate und möchten wissen, ob diese für Sie infrage kommen.",
    "sections": [
      {
        "heading": "Was die Beratung umfasst",
        "paragraphs": [
          "Zur Abklärung können die Krankengeschichte, eine klinische Untersuchung und Röntgendiagnostik gehören. Die Praxis bespricht die Voraussetzungen und mögliche Gegenanzeigen."
        ]
      },
      {
        "heading": "Alternativen vergleichen",
        "paragraphs": [
          "Ein Implantat ist nicht die einzige Möglichkeit, einen fehlenden Zahn zu ersetzen. Brücken und Prothesen werden als Alternativen in die Beratung einbezogen."
        ]
      },
      {
        "heading": "Planung und Kosten",
        "paragraphs": [
          "Risiken, mögliche Behandlungsschritte und ein individueller Behandlungs- und Kostenplan sind Teil des Beratungsthemas.",
          "Ob eine Implantatbehandlung für Ihre persönliche Zahnsituation geeignet ist, wird im Beratungsgespräch geklärt. Erkundigen Sie sich dabei auch, wer die einzelnen Behandlungsschritte durchführt."
        ]
      }
    ],
    "related": [
      "zahnersatz"
    ]
  },
  {
    "slug": "kinderzahnheilkunde",
    "title": "Kinderzahnheilkunde",
    "short": "Vorsorge und Behandlung für Kinder.",
    "lead": "Kinder benötigen eine Betreuung, die zu ihrem Alter und ihrer Zahnentwicklung passt. Die Praxis bietet kindgerechte Kontrollen, Vorsorge und Behandlung an.",
    "decision": "Sie suchen eine zahnärztliche Betreuung für Ihr Kind.",
    "image": "/assets/images/kinder-daumen.webp",
    "imageAlt": "Kind in einer zahnärztlichen Behandlungssituation",
    "sections": [
      {
        "heading": "Kontrolle und Vorsorge",
        "paragraphs": [
          "Dazu gehören die Untersuchung von Milch- und bleibenden Zähnen, Hinweise zur Zahnpflege sowie individuelle Prophylaxe. Auch die Fissurenversiegelung kann eine Rolle spielen."
        ]
      },
      {
        "heading": "Behandlung der Milchzähne",
        "paragraphs": [
          "Kariöse oder beschädigte Milchzähne können je nach Befund mit geeigneten Füllungen versorgt werden."
        ]
      },
      {
        "heading": "Fragen vor dem ersten Besuch",
        "paragraphs": [
          "Wenn Sie vor dem Termin etwas zur Betreuung Ihres Kindes oder zum ersten Besuch wissen möchten, können Sie dies mit dem Praxisteam besprechen."
        ]
      }
    ],
    "related": [
      "prophylaxe-vorsorge"
    ]
  }
];
export const team = [
  {
    "name": "Daniela Tamas-Hess",
    "role": "Zahnärztin und Inhaberin",
    "image": "/assets/images/team/team-tamas-hess.webp"
  },
  {
    "name": "Céline Ritz",
    "role": "Praxismanagerin und Dentalassistentin",
    "image": "/assets/images/team/team-ritz.webp"
  },
  {
    "name": "Cornelia Eggli",
    "role": "Prophylaxeassistentin",
    "image": "/assets/images/team/team-eggli.webp"
  },
  {
    "name": "Tanja Schwägli",
    "role": "Prophylaxeassistentin",
    "image": "/assets/images/team/team-schwaegli.webp"
  },
  {
    "name": "Olivia von Allmen",
    "role": "Auszubildende",
    "image": "/assets/images/team/team-von-allmen.webp"
  },
  {
    "name": "Claudiu Johannes Tamas",
    "role": "Wissenschaftlicher Praxiskoordinator und Leiter Qualitätsmanagement",
    "image": "/assets/images/team/team-tamas.webp"
  }
];
export const hrefFor = (slug) => "/behandlungen/" + slug + "/";

