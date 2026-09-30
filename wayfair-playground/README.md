# Wayfair API Playground — demo data

Data for a ReadMe proof of concept: the `GqlExplorer` custom block renders it as
a GraphQL playground on a ReadMe hub, via
`<GqlExplorer catalog="…/wayfair-playground/wayfair-playground.json" />`.

- `wayfair-playground.json` — 16 APIs, 50 operations and 149 request/response
  scenarios, as shown on Wayfair's public API Playground
  (developer.wayfair.io/integrations/api/playground).
- `schemas/*.graphql` — one SDL file per API, rebuilt from Wayfair's public
  reference docs and corrected so every playground operation validates. **Not
  produced by introspection**; each file's header says what was changed and
  what was inferred.

This is not an official Wayfair source. Responses are recorded samples; nothing
here calls a Wayfair API.
