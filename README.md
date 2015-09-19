# Donation Announcer

Queries the GoFundmePage (currently only [AbleGamers event](https://fundrazr.com/campaigns/a11wc4/ab/753y8a?)) recent donations page fragment and displays it in-game.  Items can be marked as finished, and will then be culled when the feed is manually refreshed.  Automatic refresh is currently 10 seconds.

## Keybinds (defaults)

- Next item: alt+n
- Manual refresh: alt+u

## Settings

The mod loads canned test pages by default.  The current feed can be changed to feed for the Community AbleGamers Tournament in the settings.

## Integrations

### Improved Player Control

Mod will always attempt to identify player names, and if exactly one player is matched, sends a message that will be picked up by the IPC mod to select that player.

### Sandbox Unit Menu

This mod attempts to directly load the menu from SUM (this involves a hacky timeout and really needs a proper api).

-It will attempt to identify menu codes in the comments and present those as tags on the display.
- The total code value is displayed for verification.
- If a large donation is received for a single code, it will be automatically expanded to multiple items.
- When selecting the item, each recognized code will be made current and sent to SUM for execution.
