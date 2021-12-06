import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | item', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders proper image', async function (assert) {
    this.set('item', {
      download_url: 'https://something.ca',
    });

    await render(hbs`<Item::PhotoProduct @photoItem={{this.item}}/>`);

    assert.dom(this.element.firstChild).hasClass('detail-info');
    assert.dom('img').hasProperty('src="https://something.ca"');
  });
});
