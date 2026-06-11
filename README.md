# Pronosticuri Cupa Mondială 2026

Un joc de pronosticuri pentru Cupa Mondială 2026, construit pentru 3 jucători cu clasament automat pe puncte.

## Ce face aplicația

- **Pronosticuri**: Fiecare jucător poate introduce scorul prezis pentru oricare meci
- **Clasament automat**: Punctele se calculează automat pe baza rezultatelor reale
- **Admin**: O secțiune dedicată pentru introducerea scorurilor reale ale meciurilor
- **Setări**: Personalizare nume și culori pentru cei 3 jucători

### Sistem de punctaj

| Pronostic | Puncte |
|-----------|--------|
| Scor exact ghicit | 10 puncte |
| Câștigătoare sau egal prezis corect (fără scorul exact) | 5 puncte |
| Pronostic greșit | 0 puncte |

## Tehnologii

- **Frontend**: React 19 + TanStack Start + TanStack Router
- **Styling**: Tailwind CSS v4
- **Backend**: TanStack Start API Routes (Server Routes)
- **Bază de date**: Netlify Database (Postgres) cu Drizzle ORM
- **Deploy**: Netlify

## Rulare locală

```bash
npm install
netlify dev
```

Asigurați-vă că aveți Netlify CLI instalat și că site-ul este legat la un proiect Netlify pentru accesul la baza de date.
