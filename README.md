Fullstack - Nuxt ASP.NET Core (C#)

- Backedn to Frontend: **Nuxt 3 (TypeScript, Pinia)** -> (page) js, html, css
- Backend: **ASP.NET Core (C#) s JWT, EF Core**
- Oddělené interní a veřejné API

Struktura projektu

```
App/
├── Nuxt/ # Frontend (Nuxt 3)
│ ├── pages/ # Stránky aplikace
│ ├── stores/ # Pinia store pro uživatele, autentizaci
│ ├── middleware/ # Ochrana rout (např. přesměrování na login)
│ ├── plugins/ # Načtení tokenu při startu
│ ├── utils/ # fetchFromApp / fetchExternal
│ └── nuxt.config.ts # Konfigurace Nuxt + runtime config
│
├── API/ # ASP.NET Core API
│ ├── Controllers/ # End-pointy
│ └── Program.cs # Hlavní konfigurace serveru, JWT, CORS, atd.
│
├── BusinessLayer/ # Byznys logika, služby, rozhraní
│
├── Data/ # DbContext, Entities, DTOs
│ └── Models/Dtos/ # DTOs rozdělené podle použití
│
│
└── TaskScheduler/ # runner pro CLI nástroje (např. export DTOs)
```