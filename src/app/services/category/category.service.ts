import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private apiService : ApiService) { }

  async getCategories(){
    const categories= await lastValueFrom(this.apiService.getCategories())
    return categories;
  }
}
