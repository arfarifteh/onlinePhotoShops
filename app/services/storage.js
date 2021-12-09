import Service, { inject as service } from '@ember/service';
import { set } from '@ember/object';

export default class StorageService extends Service {
  @service store;

  itemNumbers = 100;
  payload = {};

  uploadData() {
    //https://picsum.photos/v2/list?page=1&limit=100
    const payload = this.store.query('item', {
      page: 1,
      limit: this.itemNumbers,
    });

    return set(this, 'payload', payload);
  }
}
