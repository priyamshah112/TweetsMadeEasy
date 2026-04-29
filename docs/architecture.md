# Architecture

The application is a server-rendered Express app. Passport handles Twitter OAuth, MongoDB stores session state, and controller logic coordinates post-related workflows.

## Component View

```mermaid
flowchart LR
  Actor["Publisher"] --> Entry["EJS web interface"]
  Entry --> Service["Express controllers and OAuth middleware"]
  Service --> Data["MongoDB session store"]
  Service --> External["Twitter or X API"]
```

## Key Components

- Express entry point
- Passport Twitter strategy
- MongoDB-backed session storage
- EJS views and static assets
- Twitter API integration layer

## Main Workflow

```mermaid
sequenceDiagram
  participant User
  participant Client
  participant App
  participant Store
  User->>Client: Authenticates and prepares a post
  Client->>App: Submits post workflow
  App->>Store: Validate and persist state
  Store-->>App: Session and auth state validated
  App-->>Client: Returns publish result or error
  Client-->>User: Present updated result
```

## Design Considerations

- Make user consent explicit
- Treat platform rate limits and policy changes as core product constraints
- Keep post preview and confirmation steps separate from API submission


