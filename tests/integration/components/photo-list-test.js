import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | photo-list', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders proper image', async function (assert) {
    this.set('item', [
      {
        author: 'myName',
        download_url: 'https://something.ca',
      },
      {
        author: 'anotherName',
        download_url: 'https://somethingelse.ca',
      },
    ]);

    await render(hbs`<PhotoList @itemList={{this.item}}/>`);

    assert.equal(document.querySelectorAll('section').length, 2);
    assert.dom('img').hasProperty('src="https://something.ca"');
  });
});
