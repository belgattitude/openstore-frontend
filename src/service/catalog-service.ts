import {inject} from 'aurelia-framework';
import 'fetch';
import {HttpClient} from 'aurelia-http-client';


@inject(HttpClient)
export class CatalogService {

  protected api_url;

  constructor(private http: HttpClient) {
    this.api_url = 'http://localhost/workspace/openstore/public/api/';
    /*
    http.configure(config => {
      config
        .useStandardConfiguration()
        .withBaseUrl(api_url);
    });
    */
    console.log('api_url', this.api_url);
  }

  search(searchText) {
    let uri = "productcatalog.json?api_key=TEST123-TEST456-TEST789&language=en&disable_packaging=true&pricelist=BE&limit=100&query=" + searchText;
    return this.http.get(this.api_url + uri);
/*
    return this.http.fetch(uri,
      {
        method: 'GET',
        //headers: myHeaders,
        //mode: 'cors',
        cache: 'default'
      }
    )
      .then(response => response.json())
      
      .then(data => {
        console.log('cool', data);
      })
      //      .then(users => this.users = users);

      //.then(products => this.products = products.data);
*/

  }

}
