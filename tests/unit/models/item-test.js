import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Model | item', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    const store = this.owner.lookup('service:store');
    const item = {
      author: 'Annie Leibovitz',
      url: 'https://en.wikipedia.org/wiki/Annie_Leibovitz',
      width: 600,
      height: 800,
      download_url: 'https://fineart.ha.com/',
    };
    const itemModel = store.createRecord('item', item);

    assert.equal(itemModel.author, item.author);
    assert.equal(itemModel.url, item.url);
    assert.equal(itemModel.download_url, item.download_url);
    // assert.equal(itemModel.resolution, `${item.width} X ${item.height}`);
  });
});
