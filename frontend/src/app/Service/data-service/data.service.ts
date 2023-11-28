import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private httpClient: HttpClient) { }

  getData() {
    return this.httpClient.get('http://127.0.0.1:8000/api/products')
  }

  insertData(data: any) {
    return this.httpClient.post('http://127.0.0.1:8000/api/addProduct', data)
  }

  uploadFile(file: File, stringData: string) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('stringData', stringData);

    return this.httpClient.post('http://127.0.0.1:8000/api/addProduct', formData);
  }

  deleteData(id: number) {
    return this.httpClient.delete('http://127.0.0.1:8000/api/deleteProduct/'+ id)
  }
  
}
