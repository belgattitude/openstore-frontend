import {autoinject} from 'aurelia-framework';
import {BindingEngine} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import 'fetch';

@autoinject
export class Products {
  heading = 'Products';
  products = [];
  requestParams = {};
  searchText = '';

  constructor(private http: HttpClient, private bindingEngine: BindingEngine) {
    var api_url = 'http://localhost/workspace/openstore/public/api/';

    http.configure(config => {
      config
        .useStandardConfiguration()
        .withBaseUrl(api_url);
    });
    console.log('api_url', api_url);

    this.requestParams = { searchText: 'bar' };

    // subscribe
    let subscription = bindingEngine.propertyObserver(this, 'searchText')
      .subscribe((newValue, oldValue) => this.updateProducts());

    // unsubscribe (in destuctor)
    // subscription.dispose();
  }

  updateProducts() {

    var uri = "productcatalog.json?api_key=TEST123-TEST456-TEST789&language=en&pricelist=BE&limit=100&query=" + this.searchText;

    return this.http.fetch(uri,
      {
        method: 'GET',
        //headers: myHeaders,
        //mode: 'cors',
        cache: 'default'
      }
    )
      .then(response => response.json())
      /*
      .then(data => {
        console.log('cool', data);
      })*/
      //      .then(users => this.users = users);

      .then(products => this.products = products.data);


  }

  activate() {
    this.updateProducts();
  }
}
