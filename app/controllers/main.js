// eslint-disable-next-line ember/no-computed-properties-in-native-classes
import { alias } from '@ember/object/computed';
import { set, action } from '@ember/object';
import { inject as service } from '@ember/service';
import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';

export default class MainController extends Controller {
  @service store;
  @service storage;
  @tracked pageNumber;

  allPhotoList = [];
  itemNumbers = 25;
  pageNumber = 1;
  totalPages = 1;

  constructor() {
    super(...arguments);
    this.allPhotoList = this._chunkedPhotos(this.allPhotos);
    set(this, 'totalPages', this.allPhotoList.length);
    this.photoList = this.allPhotoList[0]; // default page list is page 1
  }

  @alias('storage.payload') allPhotos;

  @action
  paginate(pagination) {
    if (pagination === 'previous' || pagination === 'next') {
      const nextPage =
        pagination === 'next' ? this.pageNumber + 1 : this.pageNumber - 1;
      if (nextPage <= this.totalPages && nextPage > 0) {
        set(this, 'photoList', this.allPhotoList[nextPage - 1]);
        set(this, 'pageNumber', nextPage);
      }
    } else {
      set(this, 'pageNumber', pagination);
      set(this, 'photoList', this.allPhotoList[pagination - 1]);
    }
  }

  /**
   * @method _chunkedPhotos
   * @private
   * @param {[object]} list
   * @param {number} size chunked size
   * @returns {[object]}
   */
  _chunkedPhotos(list, size = 25) {
    if (!list) return;
    const arr = { length: Math.ceil(list.length / size) };

    return Array.from(arr, (v, i) => list.slice(i * size, i * size + size));
  }
}
