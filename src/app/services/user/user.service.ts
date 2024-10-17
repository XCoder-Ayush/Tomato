import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private apiService: ApiService) {}
  user: any;
  async fetchAddressesOfUser() {
    if (!this.user) {
      const user = await this.fetchUser();
    }
    const addressList = await lastValueFrom(
      this.apiService.fetchAddressesOfUser(this.user.userId)
    );
    return addressList;
  }

  async fetchUser() {
    if (!this.user) {
      const user = await lastValueFrom(this.apiService.getCurrentUser());
      this.user = user.principal;
    }
    return this.user;
  }
}
