import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Service | account', function (hooks) {
  setupTest(hooks);

  hooks.beforeEach(function () {
    this.service = this.owner.lookup('service:account');
  });

  test('it exists', function (assert) {
    assert.ok(this.service);
  });

  test('it returns proper price and priceList', function (assert) {
    assert.expect(3);
    const priceList = {
      small: 25,
      medium: 50,
      large: 75,
      xLarge: 100,
    };
    assert.deepEqual(this.service.priceList, priceList);

    let price = this.service._itemPriceCalculation('large');
    assert.equal(price, priceList.large);

    price = this.service._itemPriceCalculation();
    assert.equal(price, priceList.medium, 'default price is medium one');
  });

  test('calculateTotal return price and resolution', function (assert) {
    const divEl = document.createElement('div');
    divEl.className = 'image-resolution';
    document.body.appendChild(divEl);
    const labelOne = document.createElement('label');
    divEl.appendChild(labelOne);
    const inputOne = document.createElement('input');
    inputOne.type = 'checkbox';
    inputOne.value = 'medium';
    inputOne.checked = true;
    labelOne.appendChild(inputOne);
    const labelTwo = document.createElement('label');
    divEl.appendChild(labelTwo);
    const inputTwo = document.createElement('input');
    inputTwo.type = 'checkbox';
    inputTwo.value = 'large';
    inputTwo.checked = true;
    labelTwo.appendChild(inputTwo);

    const { resolutionList, totalPrice } = this.service.calculateTotal();

    assert.deepEqual(resolutionList, ['medium', 'large']);
    assert.equal(totalPrice, '125');
  });
});
