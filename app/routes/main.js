import Route from '@ember/routing/route';

export default class MainRoute extends Route {
  async model() {
    let res = await fetch('/api/items.json');
    let { payload } = await res.json();

    return payload;
  }
}
