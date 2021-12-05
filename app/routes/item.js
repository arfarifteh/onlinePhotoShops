import Route from '@ember/routing/route';

export default class ItemRoute extends Route {
  async model(params) {
    let res = await fetch(`/api/items/${params.item_id}.json`);
    let { payload } = await res.json();

    return payload;
  }
}
