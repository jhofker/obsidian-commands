import { Plugin, moment } from "obsidian";

import { DEFAULT_SETTINGS, SlashCommandSettings, SlashCommandSettingsTab } from "./settings";

// Module state
let settings: SlashCommandSettings = DEFAULT_SETTINGS;
let app: any;
let plugin: any;

// Main plugin class (minimal, delegates to modules)
export default class ObsidianCommandsPlugin extends Plugin {
  settings: SlashCommandSettings = DEFAULT_SETTINGS;

  async onload() {
    // Initialize module state
    app = this.app;
    plugin = this;

    await loadSettings();

    // Add settings tab
    this.addSettingTab(new SlashCommandSettingsTab(this.app, this));

    // Register command for /today
    this.addCommand({
      id: "insert-today-date",
      name: "/today: Insert today's date",
      editorCallback: (editor: any) => {
        if (settings.enabledCommands.today) {
          const today = formatDate(new Date(), settings.todayFormat);
          editor.replaceSelection(today);
        }
      },
    });

    // Register command for /now
    this.addCommand({
      id: "insert-current-time",
      name: "/now: Insert current time",
      editorCallback: (editor: any) => {
        if (settings.enabledCommands.now) {
          const now = formatDate(new Date(), settings.nowFormat);
          editor.replaceSelection(now);
        }
      },
    });

    // Register event listener for real-time slash commands
    this.registerDomEvent(document, "input", handleSlashCommand);
  }

  onunload() {
    // Cleanup if needed
  }

  async saveSettings() {
    await this.saveData(this.settings);
    // Also update module state
    settings = this.settings;
  }
}

// Handle slash command typing
function handleSlashCommand(event: Event) {
  const target = event.target as HTMLElement;

  // Check if we're in an editor
  if (!target.closest(".cm-editor")) return;

  // Get the active editor through the app workspace
  try {
    const activeView = app.workspace.getActiveViewOfType(app.workspace.getViewType("markdown"));
    if (!activeView) return;

    const editor = activeView.editor;
    if (!editor) return;

    setTimeout(() => {
      const cursor = editor.getCursor();
      const line = editor.getLine(cursor.line);
      const beforeCursor = line.substring(0, cursor.ch);

      // Check for /today command
      if (settings.enabledCommands.today && beforeCursor.endsWith("/today")) {
        const today = formatDate(new Date(), settings.todayFormat);
        const startPos = { line: cursor.line, ch: cursor.ch - 6 }; // '/today' length
        const endPos = cursor;

        editor.replaceRange(today, startPos, endPos);
      }

      // Check for /now command
      if (settings.enabledCommands.now && beforeCursor.endsWith("/now")) {
        const now = formatDate(new Date(), settings.nowFormat);
        const startPos = { line: cursor.line, ch: cursor.ch - 4 }; // '/now' length
        const endPos = cursor;

        editor.replaceRange(now, startPos, endPos);
      }
    }, 0);
  } catch (error) {
    // Silently fail if editor access fails
  }
}

async function loadSettings() {
  const loadedData = await plugin.loadData();
  const newSettings = Object.assign({}, DEFAULT_SETTINGS, loadedData);
  plugin.settings = newSettings;
  settings = newSettings;
}

function formatDate(date: Date, format: string): string {
  return moment(date).format(format);
}
