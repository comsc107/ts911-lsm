'use babel';

import Ts911LsmView from './ts911-lsm-view';
import { CompositeDisposable } from 'atom';

export default {

  ts911LsmView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.ts911LsmView = new Ts911LsmView(state.ts911LsmViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.ts911LsmView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'ts911-lsm:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.ts911LsmView.destroy();
  },

  serialize() {
    return {
      ts911LsmViewState: this.ts911LsmView.serialize()
    };
  },

  toggle() {
    console.log('Ts911Lsm was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
