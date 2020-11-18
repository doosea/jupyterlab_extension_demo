import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

/**
 * Initialization data for the jupyterlab_extension_demo extension.
 */
const extension: JupyterFrontEndPlugin<void> = {
  id: 'jupyterlab-extension-demo',
  autoStart: true,
  activate: (app: JupyterFrontEnd) => {
    console.log('JupyterLab extension jupyterlab-extension-demo is activated!');
  }
};

export default extension;
