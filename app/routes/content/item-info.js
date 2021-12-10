import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class ContentItemInfoRoute extends Route {
  @service store;

  async model(params) {
    return this.store.findRecord('item', params.item_id);
  }
}
