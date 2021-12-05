import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | app-main', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    await render(hbs`<AppMain />`);

    assert.dom(this.element).hasText('');

    await render(hbs`
      <AppMain>
        main page text
      </AppMain>
    `);

    assert.dom(this.element).hasText('main page text');
  });
});
