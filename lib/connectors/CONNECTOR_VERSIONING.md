# Connector Versioning

## Two version numbers — don't confuse them

| Field        | What it tracks                          | Who changes it          |
| :----------- | :-------------------------------------- | :---------------------- |
| `apiVersion` | Which JobConnector spec you implement   | Core team only          |
| `version`    | This connector's own release            | Connector author        |

`apiVersion` is a contract between the connector and the Tuklas core.
`version` is a contract between the connector and its users (for update tracking).

---

## Breaking changes (increment `apiVersion`)

These require all existing connectors to be updated before they will load:

- Removing a required field from `JobConnector`
- Changing the signature of `parseEmail` or `scrape`
- Removing a required field from `ParsedJob`
- Renaming any existing field on either interface
- Changing what a field is expected to contain

---

## Non-breaking changes (do NOT increment `apiVersion`)

These are safe to ship without touching existing connectors:

- Adding a new **optional** field to `JobConnector` or `ParsedJob`
- Adding a new **optional** method to `JobConnector`
- Changing `alertSetupGuide` content
- Adding a new connector to the registry
- Bumping a connector's own `version`

---

## What happens when `apiVersion` doesn't match

The registry loader in `lib/connectors/index.ts` checks:

```typescript
if (connector.apiVersion !== CONNECTOR_API_VERSION) {
  console.error(
    `Connector "${connector.id}" targets apiVersion ${connector.apiVersion} ` +
    `but core expects ${CONNECTOR_API_VERSION}. Skipping.`
  )
  return null
}
```

The connector is skipped entirely. It will not appear in the marketplace
and will not receive emails. The user sees a "needs update" badge in /profile.

---

## Migration path when apiVersion increments

1. Bump `CONNECTOR_API_VERSION` in `types.ts`
2. Update this document's history table
3. Write a migration guide in `docs/connector-migration/v{N}.md`
4. Open a GitHub issue tagging all known connector authors
5. Give a minimum 4-week deprecation window before the old apiVersion is refused

---

## Version history

| apiVersion | Released   | Status  | Notes                        |
| :--------- | :--------- | :------ | :--------------------------- |
| 1          | 2025-05-02 | Current | Initial release              |
