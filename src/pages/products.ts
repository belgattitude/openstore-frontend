import {autoinject} from 'aurelia-framework';
import {BindingEngine} from 'aurelia-framework';
import 'fetch';
import {HttpClient} from 'aurelia-fetch-client';
import {CatalogService} from './catalog-service';


@autoinject
export class Products {
  heading = 'Products';
  products = [];
  requestParams = {};
  searchText = '';

  constructor(private http: HttpClient, private bindingEngine: BindingEngine, private catalogService: CatalogService) {


    /*
    let api_url = 'http://localhost/workspace/openstore/public/api/';

    http.configure(config => {
      config
        .useStandardConfiguration()
        .withBaseUrl(api_url);
    });
    console.log('api_url', api_url);
    */
    this.requestParams = { searchText: 'bar' };

    // subscribe
    let subscription = bindingEngine.propertyObserver(this, 'searchText')
      .subscribe((newValue, oldValue) => this.updateProducts());

    // unsubscribe (in destructor)
    // subscription.dispose();
  }

  updateProducts() {
    let searchText = this.searchText;
    this.catalogService.search(searchText).then(response => {
        //console.log(response);
        this.products = response.data;
    });
  }

  updateProductsOld() {

    var uri = "productcatalog.json?api_key=TEST123-TEST456-TEST789&language=en&disable_packaging=true&pricelist=BE&limit=100&query=" + this.searchText;

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
