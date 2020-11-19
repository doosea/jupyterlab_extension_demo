import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

import { IMainMenu } from '@jupyterlab/mainmenu';

import { Menu } from '@lumino/widgets';

import { ICommandPalette } from '@jupyterlab/apputils';

/**
 * Initialization data for the main menu example.
 */
const extension: JupyterFrontEndPlugin<void> = {
  id: 'package_upload',
  autoStart: true,
  requires: [ICommandPalette, IMainMenu],
  activate: (
    app: JupyterFrontEnd,
    palette: ICommandPalette,
    mainMenu: IMainMenu
  ) => {
    const { commands } = app;

    // Add a command
    const command = 'ENN:package_upload';
    commands.addCommand(command, {
      label: 'ENN:package_upload Command',
      caption: 'ENN:package_upload Command',
      execute: (args: any) => {
        console.log(
          `ENN:package_upload has been called ${args['origin']}.`
        );
        window.alert(
          `ENN:package_upload has been called ${args['origin']}.`
        );
      }
    });

    // Add the command to the command palette,  command palette 中的标题
    const category = 'ENN';
    palette.addItem({
      command,
      category,
      args: { origin: 'from the palette' }
    });

    // Create a menu
    const tutorialMenu: Menu = new Menu({ commands });
    tutorialMenu.title.label = 'ENN'; // menu 标题
    mainMenu.addMenu(tutorialMenu, { rank: 80 });

    // Add the command to the menu
    tutorialMenu.addItem({ command, args: { origin: 'from the menu' } });
  }
};

export default extension;
