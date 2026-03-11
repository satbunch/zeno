import { App, PluginSettingTab, Setting } from "obsidian";
import ZenModePlugin from "./main";

export class ZenModeSettingTab extends PluginSettingTab {
  plugin: ZenModePlugin;

  constructor(app: App, plugin: ZenModePlugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display(): void {
    const { containerEl } = this;
    containerEl.empty();

    containerEl.createEl("h2", { text: "Zenora settings" });

    new Setting(containerEl)
      .setName("Zen mode font")
      .setDesc("Font to use while zen mode is active")
      .addText((text) =>
        text
          .setPlaceholder("e.g. Georgia, Noto Serif JP")
          .setValue(this.plugin.settings.font)
          .onChange(async (value) => {
            this.plugin.settings.font = value;
            await this.plugin.saveSettings();
            this.plugin.zenMode.applyFont(value);
          })
      );

    new Setting(containerEl)
      .setName("Content width")
      .setDesc("Text column width while zen mode is active (px)")
      .addText((text) =>
        text
          .setPlaceholder("900")
          .setValue(String(this.plugin.settings.contentWidth))
          .onChange(async (value) => {
            const num = parseInt(value, 10);
            if (!isNaN(num) && num > 0) {
              this.plugin.settings.contentWidth = num;
              await this.plugin.saveSettings();
              this.plugin.zenMode.applySettings(this.plugin.settings);
            }
          })
      );

    new Setting(containerEl)
      .setName("Hide status bar")
      .setDesc("Hide the status bar while zen mode is active")
      .addToggle((toggle) =>
        toggle
          .setValue(this.plugin.settings.hideStatusBar)
          .onChange(async (value) => {
            this.plugin.settings.hideStatusBar = value;
            await this.plugin.saveSettings();
            this.plugin.zenMode.applySettings(this.plugin.settings);
          })
      );

    new Setting(containerEl)
      .setName("Hide inline title")
      .setDesc("Hide the inline title while zen mode is active")
      .addToggle((toggle) =>
        toggle
          .setValue(this.plugin.settings.hideInlineTitle)
          .onChange(async (value) => {
            this.plugin.settings.hideInlineTitle = value;
            await this.plugin.saveSettings();
            this.plugin.zenMode.applySettings(this.plugin.settings);
          })
      );

    new Setting(containerEl)
      .setName("Hide properties")
      .setDesc("Hide the frontmatter properties block while zen mode is active")
      .addToggle((toggle) =>
        toggle
          .setValue(this.plugin.settings.hideProperties)
          .onChange(async (value) => {
            this.plugin.settings.hideProperties = value;
            await this.plugin.saveSettings();
            this.plugin.zenMode.applySettings(this.plugin.settings);
          })
      );

    new Setting(containerEl)
      .setName("Hide backlinks")
      .setDesc("Hide the backlinks panel while zen mode is active")
      .addToggle((toggle) =>
        toggle
          .setValue(this.plugin.settings.hideBacklinks)
          .onChange(async (value) => {
            this.plugin.settings.hideBacklinks = value;
            await this.plugin.saveSettings();
            this.plugin.zenMode.applySettings(this.plugin.settings);
          })
      );

    new Setting(containerEl)
      .setName("Top padding")
      .setDesc("Top padding of the editor area while zen mode is active (px)")
      .addText((text) =>
        text
          .setPlaceholder("60")
          .setValue(String(this.plugin.settings.paddingTop))
          .onChange(async (value) => {
            const num = parseInt(value, 10);
            if (!isNaN(num) && num >= 0) {
              this.plugin.settings.paddingTop = num;
              await this.plugin.saveSettings();
              this.plugin.zenMode.applySettings(this.plugin.settings);
            }
          })
      );

    new Setting(containerEl)
      .setName("Bottom padding")
      .setDesc("Bottom padding of the editor area while zen mode is active (px)")
      .addText((text) =>
        text
          .setPlaceholder("60")
          .setValue(String(this.plugin.settings.paddingBottom))
          .onChange(async (value) => {
            const num = parseInt(value, 10);
            if (!isNaN(num) && num >= 0) {
              this.plugin.settings.paddingBottom = num;
              await this.plugin.saveSettings();
              this.plugin.zenMode.applySettings(this.plugin.settings);
            }
          })
      );
  }
}
