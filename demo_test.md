# Poilian tourism platform — development demo access

These are non-production test accounts for local development and staging only. Do not use them after launch; rotate or delete them before production.

| Access | Email | Password | What it validates |
| --- | --- | --- | --- |
| Traveler | `demo.traveler@poilian.test` | `PoilianTraveler!2026` | Sign in, profile, saved items, trips and bookings |
| Partner | `demo.partner@poilian.test` | `PoilianPartner!2026` | Partner profile and linked demo tourism business |
| Administrator | `demo.admin@poilian.test` | `PoilianAdmin!2026` | Admin role and platform administration workflows |

## Routes to test

- English login: `/en/login`
- French login: `/fr/login`
- Arabic login: `/ar/login`
- Traveler dashboard: `/en/dashboard`
- Profile: `/profile` or `/en/profile`
- Partner centre: `/partner`
- 360° Studio: `/partner/studio`
- AI planner: `/planner`
- Admin workspace: `/admin`

Create or refresh the accounts with `yarn demo:seed`. The command is idempotent: it links profiles and the demo partner business without duplicating them.
