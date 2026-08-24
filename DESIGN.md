# DESIGN.md

## Overview

Service / Ledger treats a local service list like a working catalog: write a line, assign its state, search the ledger, and remove what no longer belongs.

## Colors

- Cream `#f5f0e7` is the catalog paper; ink `#18252a` is the primary text.
- Blue `#235b9b` is the action and navigation ink.
- Orange `#e56f42` is the catalog stamp and row index accent.
- Lime `#b2c735` marks available items; yellow marks drafts.

## Typography

- Trebuchet MS gives the ledger a practical, human service-counter voice.
- Courier New is reserved for labels, counts, filters, and local-storage notes.
- Large headlines are heavy and compact; descriptions remain plain and conversational.

## Layout

- The first viewport establishes the catalog thesis and count before the two-part workspace.
- A narrow write form sits beside the wider ledger; mobile stacks form before list so adding remains primary.
- Rows use numbering and state labels rather than isolated cards.

## Elevation & Depth

Depth is flat and printed: one inset paper tone separates the form from the ledger, with rules doing the structural work.

## Shapes

Square panels, underlined fields, rectangular state labels, and one slightly rotated catalog stamp. No pill-heavy UI.

## Components

- Add form with name, details, state, and honest local-only note.
- Search field and state filter buttons.
- Numbered service rows with inline status and remove action.
- Empty state that explains how to recover when a filter has no matches.

## Do's and Don'ts

- Do let each service read like a line in a catalog, not a marketing tile.
- Do keep local CRUD and browser-only boundaries explicit.
- Don't add pricing, checkout, accounts, or remote availability claims.
- Don't collapse the form and ledger into a generic dashboard card grid.
