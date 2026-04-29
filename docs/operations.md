# Operations

These notes capture the practical work needed to run, maintain, or modernize the repository from its current state.

## Local Operation

- Install Node.js and npm
- Run npm install
- Create local platform API credentials using safe local values
- Start the app with npm start
- Test only against accounts and apps intended for development

## Validation

- Run npm start for local smoke testing
- Test OAuth callback flow with development credentials only
- Verify failure messages for denied auth and API errors

## Maintenance Notes

- Re-check current X API terms before reuse
- Keep API credentials out of source
- Add tests for OAuth callback and session behavior

## Operational Risks

- Platform API behavior and pricing have changed over time and must be rechecked before reuse
- OAuth credentials and callback URLs are environment-specific
- Automation should include safeguards against accidental or duplicate posts


