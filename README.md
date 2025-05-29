# Obsidian Slash Commands Plugin

A module-based Obsidian plugin that provides helpful slash commands for quick text insertion.

## Features

### `/today` Command
- **Function**: Inserts the current date at the cursor position
- **Usage**: Type `/today` in any note and it will be automatically replaced with today's date
- **Configurable**: Date format can be customized in settings

### `/now` Command
- **Function**: Inserts the current time at the cursor position
- **Usage**: Type `/now` in any note and it will be automatically replaced with the current time
- **Configurable**: Time format can be customized in settings (defaults to 24-hour format)

## Available Commands

| Command | Description | Example Output |
|---------|-------------|----------------|
| `/today` | Insert current date | `2024-01-15` (default format) |
| `/now` | Insert current time | `23:11` (default format) |

## Settings

Access the plugin settings through Obsidian's Settings > Community Plugins > Slash Commands.

### Configuration Options

- **Enable /today command**: Toggle to enable/disable the `/today` slash command
- **Today date format**: Customize the date format using moment.js format patterns
- **Enable /now command**: Toggle to enable/disable the `/now` slash command  
- **Now time format**: Customize the time format using moment.js format patterns (default: HH:mm)

#### Format Patterns:
  - `YYYY` - 4-digit year (2024)
  - `MM` - 2-digit month (01-12)
  - `DD` - 2-digit day (01-31)
  - `MMMM` - Full month name (January)
  - `Do` - Day with ordinal suffix (1st, 2nd, 3rd, 4th)
  - `dddd` - Full day name (Monday, Tuesday, etc.)
  - `HH:mm` - 24-hour time format
  - `h:mm A` - 12-hour time format with AM/PM
  - `[text]` - Literal text (e.g., `[Today is] dddd` → "Today is Monday")

### Common Date Formats

- `YYYY-MM-DD` → 2024-01-15
- `DD/MM/YYYY` → 15/01/2024
- `MM/DD/YYYY` → 01/15/2024
- `MMMM Do, YYYY` → January 15th, 2024
- `dddd, MMMM Do` → Monday, January 15th
- `YYYY-MM-DD HH:mm` → 2024-01-15 14:30
- `[Today is] dddd` → Today is Monday

### Common Time Formats

- `HH:mm` → 23:11 (24-hour format, default for /now)
- `h:mm A` → 11:11 PM (12-hour format with AM/PM)
- `HH:mm:ss` → 23:11:45 (24-hour with seconds)
- `h:mm:ss A` → 11:11:45 PM (12-hour with seconds)
- `[Time: ]HH:mm` → Time: 23:11 (custom text + time)

For more format options, see the [moment.js documentation](https://momentjs.com/docs/#/displaying/format/).

## How It Works

The plugin uses a modular approach with two main components:

1. **Real-time Detection**: Automatically detects when you type slash commands and replaces them
2. **Manual Command**: Access commands through Obsidian's command palette (Ctrl/Cmd + P)

## Installation

1. Copy the plugin files to your `.obsidian/plugins/obsidian-commands/` directory
2. Enable the plugin in Obsidian's Community Plugins settings
3. Configure the settings as desired

## Development

This plugin is built using a module-based architecture instead of classes, making it easier to extend and maintain.

### File Structure

- `src/main.ts` - Main plugin logic and slash command handling
- `src/settings.ts` - Settings interface and configuration
- `styles.css` - Plugin styling

### Adding New Commands

To add a new slash command:

1. Add the command configuration to the settings interface
2. Implement the command logic in the main plugin file
3. Add the command detection in the `handleSlashCommand` function

## License

MIT License 