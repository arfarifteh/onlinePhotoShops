import Component from '@glimmer/component';
import { inject as service } from '@ember/service';

export default class PhotoListComponent extends Component {
  @service storage;
  photoList = [];

  constructor() {
    super(...arguments);
  }
}
