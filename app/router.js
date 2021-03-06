import EmberRouter from '@ember/routing/router';
import config from 'online-photo-shops/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('main', { path: '/' });
  this.route('main', { path: '/home' });

  this.route('content', function () {
    this.route('item-info', { path: '/items/:item_id' });
  });
});
