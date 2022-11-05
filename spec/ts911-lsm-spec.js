'use babel';

import Ts911Lsm from '../lib/ts911-lsm';

// Use the command `window:run-package-specs` (cmd-alt-ctrl-p) to run specs.
//
// To run a specific `it` or `describe` block add an `f` to the front (e.g. `fit`
// or `fdescribe`). Remove the `f` to unfocus the block.

describe('Ts911Lsm', () => {
  let workspaceElement, activationPromise;

  beforeEach(() => {
    workspaceElement = atom.views.getView(atom.workspace);
    activationPromise = atom.packages.activatePackage('ts911-lsm');
  });

  describe('when the ts911-lsm:toggle event is triggered', () => {
    it('hides and shows the modal panel', () => {
      // Before the activation event the view is not on the DOM, and no panel
      // has been created
      expect(workspaceElement.querySelector('.ts911-lsm')).not.toExist();

      // This is an activation event, triggering it will cause the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'ts911-lsm:toggle');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        expect(workspaceElement.querySelector('.ts911-lsm')).toExist();

        let ts911LsmElement = workspaceElement.querySelector('.ts911-lsm');
        expect(ts911LsmElement).toExist();

        let ts911LsmPanel = atom.workspace.panelForItem(ts911LsmElement);
        expect(ts911LsmPanel.isVisible()).toBe(true);
        atom.commands.dispatch(workspaceElement, 'ts911-lsm:toggle');
        expect(ts911LsmPanel.isVisible()).toBe(false);
      });
    });

    it('hides and shows the view', () => {
      // This test shows you an integration test testing at the view level.

      // Attaching the workspaceElement to the DOM is required to allow the
      // `toBeVisible()` matchers to work. Anything testing visibility or focus
      // requires that the workspaceElement is on the DOM. Tests that attach the
      // workspaceElement to the DOM are generally slower than those off DOM.
      jasmine.attachToDOM(workspaceElement);

      expect(workspaceElement.querySelector('.ts911-lsm')).not.toExist();

      // This is an activation event, triggering it causes the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'ts911-lsm:toggle');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        // Now we can test for view visibility
        let ts911LsmElement = workspaceElement.querySelector('.ts911-lsm');
        expect(ts911LsmElement).toBeVisible();
        atom.commands.dispatch(workspaceElement, 'ts911-lsm:toggle');
        expect(ts911LsmElement).not.toBeVisible();
      });
    });
  });
});
