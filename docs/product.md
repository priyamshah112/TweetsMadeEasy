# Product Notes

The product idea is a focused publishing assistant, not a generic social dashboard. Its value comes from reducing repeated steps while staying transparent about platform actions.

## User Journeys

- User signs in with a social account
- User prepares a post and confirms publication
- Application handles API response and reports status

## Functional Requirements

- OAuth login and callback handling
- Session-backed user flow
- Post creation or publishing action through platform API

## Constraints

- API access terms can change
- Posting actions must be deliberate and reversible where possible
- Credential handling must be environment-specific

## Roadmap Ideas

- Add draft and scheduled-post concepts
- Add provider abstraction for multiple social platforms
- Add dry-run mode and post history


