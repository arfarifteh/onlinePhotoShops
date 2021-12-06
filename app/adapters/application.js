import JSONAPIAdapter from '@ember-data/adapter/json-api';

export default class ApplicationAdapter extends JSONAPIAdapter {
  host = 'https://picsum.photos';
  pathForType() {
    return 'v2/list';
  }
}
