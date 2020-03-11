# Donation Announcer

Queries the various data sources via the Donation Data mod for recent donations page fragment and displays it in-game.  Items can be marked as finished, and will then be culled when the feed is manually refreshed.  Automatic refresh is currently 10 seconds.

## Keybinds (defaults)

- Next item: alt+n
- Manual refresh: alt+u

## Settings

The mod loads canned test pages by default.  The current feed can be changed to feed for the Community AbleGamers Tournament in the settings.

## Integrations

### Donation Data (required)

Contains data feeds, shared with Donation Panel

### Sandbox Unit Menu

This mod attempts to directly load the menu from SUM (this involves a hacky timeout and really needs a proper api).

-It will attempt to identify menu codes in the comments and present those as tags on the display.
- The total code value is displayed for verification.
- If a large donation is received for a single code, it will be automatically expanded to multiple items.
