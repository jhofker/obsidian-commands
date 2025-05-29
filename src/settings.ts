import { App, PluginSettingTab, Setting } from "obsidian";

export interface SlashCommandSettings {
  enabledCommands: {
    today: boolean;
    now: boolean;
  };
  todayFormat: string;
  nowFormat: string;
}

export const DEFAULT_SETTINGS: SlashCommandSettings = {
  enabledCommands: {
    today: true,
    now: true,
  },
  todayFormat: "YYYY-MM-DD",
  nowFormat: "HH:mm",
};

export class SlashCommandSettingsTab extends PluginSettingTab {
  plugin: any;

  constructor(app: App, plugin: any) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display(): void {
    const { containerEl } = this;

    containerEl.empty();
    containerEl.createEl("h2", { text: "Slash Commands Settings" });

    new Setting(containerEl)
      .setName("Enable /today command")
      .setDesc("Toggle the /today slash command")
      .addToggle((toggle) =>
        toggle.setValue(this.plugin.settings.enabledCommands.today).onChange(async (value) => {
          this.plugin.settings.enabledCommands.today = value;
          await this.plugin.saveSettings();
        })
      );

    new Setting(containerEl)
      .setName("Today date format")
      .setDesc("Format for the /today command (using moment.js format)")
      .addText((text) =>
        text
          .setPlaceholder("YYYY-MM-DD")
          .setValue(this.plugin.settings.todayFormat)
          .onChange(async (value) => {
            this.plugin.settings.todayFormat = value;
            await this.plugin.saveSettings();
          })
      );

    new Setting(containerEl)
      .setName("Enable /now command")
      .setDesc("Toggle the /now slash command")
      .addToggle((toggle) =>
        toggle.setValue(this.plugin.settings.enabledCommands.now).onChange(async (value) => {
          this.plugin.settings.enabledCommands.now = value;
          await this.plugin.saveSettings();
        })
      );

    new Setting(containerEl)
      .setName("Now time format")
      .setDesc("Format for the /now command (using moment.js format)")
      .addText((text) =>
        text
          .setPlaceholder("HH:mm")
          .setValue(this.plugin.settings.nowFormat)
          .onChange(async (value) => {
            this.plugin.settings.nowFormat = value;
            await this.plugin.saveSettings();
          })
      );

    containerEl.createEl("p", {
      text: "Common formats: YYYY-MM-DD, DD/MM/YYYY, MM/DD/YYYY, MMMM Do YYYY, dddd MMMM Do, YYYY",
      cls: "setting-item-description",
    });

    containerEl.createEl("p", {
      text: "More formats: h:mm A (time), YYYY-MM-DD HH:mm (datetime), [Today is] dddd (custom text)",
      cls: "setting-item-description",
    });
  }
}
