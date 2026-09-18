# Pernod

**Owner:** Bruno Antoniassi  
**Status:** In progress  
**Target:** Finish current scope by **2026-10-01**  
**Last updated:** 2026-09-17

## Objective

Complete the current Pernod work with a clear operational flow, validated integration assumptions and enough documentation for another person or agent to understand what exists, what remains and what should happen next.

## Current state

The work is currently in **technical discovery / integration definition**.

The main open thread is turning the real Pernod operational input into a reliable flow that can be implemented and validated without depending on undocumented assumptions.

## Progress so far

- Pernod has a dedicated campaign repository: `SuperlikersGlobal/campaign-ti-PERNOD`.
- The integration flow has been discussed with Andrés.
- A Git-based source of truth is being prepared so technical information can remain updated and shareable.
- The expected interaction includes receiving source evidence through an upload flow and transforming it into the structure required by the integration.
- A relevant operational constraint was identified: the Pernod process works with **bottles rather than tickets**, so the transformation/mapping needs to account for that input model.
- The participant lookup path in the Superlikers API has been tested from the local environment.
- The tested email lookup did **not yet confirm a participant or expose the expected distinct ID / UID**, so that API path still needs validation before it can be considered solved.

## In progress

- Define exactly where the integrated information will be stored and in what format.
- Prepare at least one concrete example of the expected input → transformation → stored result.
- Validate the mapping required for bottle-based inputs.
- Confirm the correct participant lookup / identity resolution flow.
- Keep the implementation context documented in Git so another person can continue without relying on meeting memory.

## Pending / blockers

- Final confirmation of the canonical data shape and storage location.
- Working example that can be used as the integration reference.
- Confirmation of the participant identifier lookup.
- End-to-end validation with a realistic Pernod case.

## Completion criteria

Pernod can be marked complete for this action plan when:

1. the input and output structures are explicit;
2. the bottle-based transformation is defined;
3. identity / participant resolution is validated or its dependency is clearly documented;
4. at least one representative end-to-end case is validated;
5. the resulting workflow and remaining dependencies are documented in Git.

## Next step

Produce the canonical example for the integration and use it to close the remaining assumptions one by one before **2026-10-01**.

## History

See `updates/` for dated progress notes.
