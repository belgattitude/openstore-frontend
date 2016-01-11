import {autoinject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import 'fetch';

@autoinject
export class Products {
  heading = 'Products';
  products = [];

  constructor(private http: HttpClient) {
    var api_url = 'http://localhost/workspace/openstore/public/api/';
    http.configure(config => {
      config
        .useStandardConfiguration()
        .withBaseUrl(api_url);
    });
    console.log('api_url', api_url);
  }


  activate() {
    return this.http.fetch('productcatalog.json?api_key=TEST123-TEST456-TEST789&language=en&pricelist=BE&limit=10')
      .then(response => response.json())
      /*
      .then(data => {
        console.log('cool', data);
      })*/
      //      .then(users => this.users = users);

      .then(products => this.products = products.data);
  }
}
