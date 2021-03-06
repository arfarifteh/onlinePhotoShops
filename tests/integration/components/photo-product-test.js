import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | photo-product', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    this.set('item', {
      author: 'myName',
      url: 'https://something.ca',
    });
    await render(hbs`<PhotoProduct @photoItem={{this.item}}/>`);

    assert
      .dom(this.element)
      .hasText(
        'Author: myName URL: https://something.ca Original Resolution: X Small$25 Medium$50 Large$75 X-Large$100 Add to Cart Show my Cart'
      );
  });
});
