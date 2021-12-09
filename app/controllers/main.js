// eslint-disable-next-line ember/no-computed-properties-in-native-classes
import { alias } from '@ember/object/computed';
import { set, action } from '@ember/object';
import { inject as service } from '@ember/service';
import Controller from '@ember/controller';

export default class MainController extends Controller {
  @service store;
  @service storage;

  itemNumbers = 25;

  constructor() {
    super(...arguments);
    this.allPhotoList = this.chunkedPhotos();
    set(this, 'pageNumber', this.allPhotoList.length);
    this.photoList = this.allPhotoList[0];
  }

  @alias('storage.payload') allPhotos;

  @action
  paginate(pageNumber) {
    set(this, 'photoList', this.allPhotoList[pageNumber - 1]);
  }

  chunkedPhotos(size = 25) {
    const arr = { length: Math.ceil(this.allPhotos.length / size) };

    return Array.from(arr, (v, i) =>
      this.allPhotos.slice(i * size, i * size + size)
    );
  }
}
