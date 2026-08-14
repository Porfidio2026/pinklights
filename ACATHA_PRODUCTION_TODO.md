# Production Readiness — Open Items

Covers the Acatha DTE integration, the DitoBanx payment gateway, and
infrastructure issues found while testing them.

Status as of 2026-08-11. The pipeline **works end to end against dev Acatha**:
Hacienda stamped `DTE-01-M001P760-000000000000008` with sello
`202652C7859334E74E69976656A63F66DB2FY17F` (Acatha DTE id `19667`).

Everything below is what still stands between that and real emission.

---

## 1. Ask Acatha

- [ ] **Fix the TLS chain on `dev.acatha.com:3000`.** It serves only its leaf
      certificate and omits the `Sectigo Public Server Authentication CA DV R36`
      intermediate, so the chain cannot be verified.
      Evidence: `openssl s_client -connect dev.acatha.com:3000 -servername dev.acatha.com`
      → `Verify return code: 21 (unable to verify the first certificate)`;
      the same command against `:443` → `0 (ok)`.
      Note for them: **it works from curl/Postman on a laptop because macOS
      fetches the missing intermediate over AIA. Servers do not.** Production
      (`sv.acatha.io:3000`) is configured correctly and sends all 4 certificates.
- [ ] **Report the `numberToWords` bug.** `GET integraciones/sv/numberToWords?cifra=5.00`
      returns `CINCO 00/100 ES00/100 DOLARES` — the fraction is duplicated with a
      stray `ES` prefix. We strip it client-side. (Also: the parameter is `cifra`
      lowercase; `Cifra` returns `"Cifra required"`.)
- [ ] **Which item should Pinklights sell?** We are currently borrowing their demo
      item `barras 0001` ("SERVICIO SITES SV10"). Need a real Pinklights item, and
      the correct `linea` / `grupo` / `unidadv` / `tipo` values for it.
      Creation endpoint: `POST inventario/items/save`.
- [ ] **Forma de pago is declared as cash but isn't.** We send
      `resumen.pagos[0].codigo: "01"` (billetes y monedas) and
      `formaPago: { value: 6, label: 'EFECTIVO' }`, while collection actually runs
      through DitoBanx. Ask which catalog code applies (`02` débito, `03` crédito,
      `05` transferencia) and whether `numPagoElectronico` must be populated.
      Hacienda accepts it today, but it is incorrect tax data.
- [ ] **Do we need CCF (`tipoDte 03`)** for business customers who want IVA credit,
      or is Consumidor Final (`01`) sufficient?
- [ ] **Refunds** — Nota de Crédito (`05`) or the DTE invalidation process?
- [ ] Confirm the **Acatha-internal sale `ambiente`** value for production. The MH
      `ambiente` is `00` → `01`, but the sale payload carries a separate `ambiente`
      currently `'1'` using a different code set (`ACATHA_AMBIENTE_VENTA`).

## 2. Credentials and endpoints (their steps 4–5)

Acatha sent production access on 2026-08-13 for the company **MENNONITES**.
Stored as `ACATHA_PROD_*` secrets so dev stays intact; set `ACATHA_ENV=prod`
to switch. Any `ACATHA_PROD_*` that is unset falls back to its `ACATHA_*` twin.

Already stored:
- `ACATHA_PROD_BASE_URL` = `https://sv.acatha.io`
- `ACATHA_PROD_API_PATH` = `/amfphp/services/SIGNUM/API/v4` (lowercase — see below)
- `ACATHA_PROD_HACIENDA_URL` = `https://sv.acatha.io:3000` (no `/md-sv` suffix)
- `ACATHA_PROD_CLIENT_ID`, `ACATHA_PROD_SECRET_KEY`

Also stored (2026-08-13), but **not yet working**:
- `ACATHA_PROD_USER` = `svasquez@mennonites.io`
- `ACATHA_PROD_PASSWORD`

Production login **works** as of 2026-08-14. What the login response gives us,
so it does not need to be asked for:

| | |
|---|---|
| company codigo | `7564` |
| NIT | `06230210241032` |
| NRC | `3497080` |
| nombre | MENNONITES SOCIEDAD ANONIMA DE CAPITAL VARIABLE |
| nombre comercial | MENNONITES IO |
| local | `13042` ("Principal") |

`emisor.nit`, `emisor.nrc` and `emisor.nombre` are read from this at runtime, so
no secrets are needed for them.

Still blocked:
- [ ] **The production catalog is empty (0 items).** A Pinklights product must be
      created via `POST /inventario/items/save` before any sale can be made.
      Valid values discovered for this company: `unidadv: 34` (UNIDAD),
      `grupo: 0` (the only group, "N/A"). `/inventario/lineas/listar` returns
      nothing, so `linea` needs confirming with Acatha.
      → then set `ACATHA_PROD_ITEM_CODE` to the item's `barras`
- [ ] **`cliente.ref` (company UUID)** for MENNONITES → `ACATHA_PROD_COMPANY_UUID`.
      Sent on every Hacienda submission; not present in the login response.
- [ ] **`codActividad` + exact `descActividad`** registered for MENNONITES.
      62020/"Consultorías y gestión de servicios informáticos" belongs to the dev
      company and will be rejected as NO CORRESPONDE A CONTRIBUYENTE.
      → `ACATHA_PROD_COD_ACTIVIDAD`, `ACATHA_PROD_EMISOR_DESC_ACTIVIDAD`
- [ ] **Registered address and phone** for MENNONITES
      → `ACATHA_PROD_EMISOR_DEPARTAMENTO`, `_MUNICIPIO`, `_DIRECCION`, `_TELEFONO`
- [ ] Ask them to rotate the secret key: it arrived in plain text.

Notes discovered while validating:
- The API path is **case-sensitive and inverted** between environments:
  dev serves `/amfphp/Services/...`, production `/amfphp/services/...`. The
  wrong casing returns an HTML 404, surfacing as `Unexpected token '<'`.
- `sv.acatha.io:3000` serves a complete 4-certificate chain and verifies
  cleanly, so `ACATHA_CA_CERT` is a dev-only workaround and must be unset
  (or simply left absent from the `ACATHA_PROD_*` set) in production.
- Hacienda production is a **later** step: their mail says they proceed with
  "paso a producción ante Hacienda" only after this API validation. Keep
  `ACATHA_AMBIENTE=00` until they confirm.

## 3. Secrets to change

| Secret | Dev value now | Production action |
|---|---|---|
| `ACATHA_AMBIENTE` | unset → defaults `00` (pruebas) | **set to `01`** — nothing is legally emitted until this changes |
| `ACATHA_CA_CERT` | Sectigo intermediate PEM | **unset** — dev workaround only, prod chain is complete |
| `ACATHA_EMISOR_TELEFONO` | `2222-2222` (placeholder) | **real registered phone**, min 8 chars |
| `ACATHA_ITEM_CODE` | `0001` (their demo item) | real Pinklights item code |
| `ACATHA_COD_ACTIVIDAD` | `62020` | confirm for the Pinklights company |
| `ACATHA_EMISOR_DESC_ACTIVIDAD` | `Consultorías y gestión de servicios informáticos` | must match `codActividad` exactly |
| `ACATHA_EMISOR_DEPARTAMENTO` | unset → `07` (Sonsonate) | real registered departamento |
| `ACATHA_EMISOR_MUNICIPIO` | unset → `01` | real registered municipio |
| `ACATHA_EMISOR_DIRECCION` | unset → `SONSONATE` | real registered address |
| `ACATHA_USER` / `ACATHA_PASSWORD` / `ACATHA_CLIENT_ID` / `ACATHA_SECRET_KEY` | dev | production credentials |

Emitter `nit`, `nrc` and `nombre` come from the Acatha login response, not from
secrets — they follow automatically once production credentials are in place.

## 3b. DitoBanx (payment gateway)

- [ ] `DITOBANX_API_URL` resolves to `pay.ditobanx.com` — the **production**
      gateway, not a sandbox. Ask whether a test environment exists; today every
      test opens a real session and a completed one is a real charge.
- [ ] `ditobanx_session_id` is always null: their session response returns
      `redirect_url` but no `session_id`/`id`, so sessions cannot be correlated
      on their side. Ask which field carries it.
- [ ] `customer.name` must be two or more words of two or more ASCII letters.
      Digits, single words and accented characters are all rejected — "Maria
      Jose Perez" with accents fails. Raise this: accented names are normal in
      El Salvador and their gateway refuses them outright.
- [ ] `SITE_URL` was pointing at a Vercel deployment-specific preview URL, so
      after paying, customers landed on Vercel's deployment-protection page
      instead of `/payment-success`. Now `https://www.pink-lights.be`. Re-check
      this whenever the frontend host changes.

## 3c. Supabase Storage — ownership mismatch (platform side)

- [ ] Report to Supabase support. Postgres logs repeat
      `42501 must be owner of function storage.get_level` in a retry loop.
      Eight functions in the `storage` schema — `add_prefixes`, `delete_prefix`,
      `delete_prefix_hierarchy_trigger`, `get_level`, `get_prefix`,
      `get_prefixes`, `objects_insert_prefix_trigger`, `prefixes_insert_trigger`
      — are owned by `supabase_admin`, while every other `storage` function is
      owned by `supabase_storage_admin`. The Storage service runs as the latter,
      so it cannot re-apply the migration that defines them.

      **Not caused by our migrations**: none of those functions appear in
      `supabase/migrations/`; ours only inserts a bucket row and creates policies
      on `storage.objects`.

      **No user impact, verified**: authenticated upload to `profile_pictures`,
      public read, bucket listing (which is exactly what `get_level` /
      `get_prefix` back), real profile photos, and invoice PDF upload/read all
      return 200. The functions execute fine; only `ALTER` on them fails.

      **Risk is deferred**: Storage has a migration it cannot finish, so a future
      Storage upgrade may stall.

      **Do not "fix" it locally.** `ALTER FUNCTION ... OWNER TO
      supabase_storage_admin` would probably fail as `postgres` anyway, and if it
      succeeded it would fight the platform's next migration.

## 4. Cleanup

- [ ] `supabase functions delete dito-test` — temporary DitoBanx validation probe.
- [ ] `supabase functions delete acatha-items` — temporary diagnostic. Supports
      `list`, `create`, `units`, `numberToWords`, `tlsTest`. Keep until the item
      code is settled.
- [ ] Delete the test invoice rows in `public.invoices` (several `failed` rows plus
      the successful dev DTE).
- [ ] Decide on `get-invoice-pdf`: it has **zero callers**. `MyInvoices.tsx` reads
      `pdf_url` straight off the row. Either wire it up or delete it.

## 5. Known gaps we chose not to fix

- [ ] **`generate-invoice` has no caller check.** With `verify_jwt: true`, any
      logged-in user can trigger generation for an arbitrary `payment_session_id`.
      Bounded (the invoice is written against the session's own `user_id`) but it
      does let users force DTE creation on other people's pending sessions.
      Correct fix is service-role **or** admin — a service-role-only check would
      break the admin retry at `AdminInvoices.tsx:87`.
- [ ] **Invoice PDFs are permanently public.** Deliberate: `MyInvoices.tsx:61,78`
      injects `pdf_url` into WhatsApp and email share text. A forwarded link stays
      valid forever. Revisit if invoices start carrying more customer detail.

---

## Reference

Run a test invoice (needs a row in `payment_sessions`):

```bash
SVC=$(supabase projects api-keys --project-ref uptvbtjryzivhybegvfa --output json \
  | python3 -c "import json,sys; print(next(k['api_key'] for k in json.load(sys.stdin) if k['name']=='service_role'))")

curl -s -X POST "https://uptvbtjryzivhybegvfa.supabase.co/functions/v1/generate-invoice" \
  -H "Authorization: Bearer $SVC" -H "Content-Type: application/json" \
  -d '{"payment_session_id":"<uuid>"}' | python3 -m json.tool
```

`ok: true` plus a non-null `sello_recibido` means a valid DTE. `ok: false` puts the
Hacienda rejection in `error`, and the raw payload lands in `invoices.json_dte`.

List Acatha catalog items:

```bash
curl -s -X POST "https://uptvbtjryzivhybegvfa.supabase.co/functions/v1/acatha-items" \
  -H "Authorization: Bearer $SVC" -H "Content-Type: application/json" \
  -d '{"action":"list"}'
```

Re-extract the Sectigo intermediate if `ACATHA_CA_CERT` ever needs rebuilding:

```bash
openssl s_client -connect dev.acatha.com:443 -servername dev.acatha.com -showcerts \
  </dev/null 2>/dev/null | awk '/BEGIN CERTIFICATE/{n++} n==2' > intermediate.pem
```

### Gotchas already solved — do not re-debug

- `numeroControl` must be **exactly 31 chars**: `DTE-01-` + `MxxxPyyy` + `-` + a
  **15-digit** sequence. Acatha returns the sequence unpadded.
- `resumen.totalLetras` must be non-empty or Hacienda rejects outright.
- Consumidor Final prices are **IVA-inclusive**: `ivaItem = ventaGravada * 13 / 113`.
  Do not add IVA on top.
- `comprador.tipo_identificacion` is required (`'12'` / `'9999999999999'` for
  CLIENTES VARIOS).
- `env(key) || fallback` in `_shared/acatha.ts` does **not** work — `env()` throws
  first. Use `optEnv(key, fallback)`.
