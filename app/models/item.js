import Model, { attr } from '@ember-data/model';

export default class ItemModel extends Model {
  @attr('string') author;
  @attr('string') url;
  @attr('number') width;
  @attr('number') height;
  @attr('string') download_url;
}
