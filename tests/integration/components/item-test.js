import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | item', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders poper image', async function (assert) {
    this.set('item', {
      download_url: 'https://something.ca',
    });

    await render(hbs`<Item @data={{this.item}}/>`);

    assert.dom('img').hasClass('preview');
    assert.dom('img').hasProperty('src="https://something.ca"');
  });
});
