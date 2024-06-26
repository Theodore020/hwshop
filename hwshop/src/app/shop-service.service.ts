import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShopServiceService {
  private cartItems = new BehaviorSubject<any[]>([]);
  cartItems$ = this.cartItems.asObservable();

  constructor() { }
  addToCart(item: any) {
    const cartItems = this.cartItems.value;
    cartItems.push(item);
    this.cartItems.next(cartItems);
  }
  deleteFromCart(id: number) {
    const cartItems = this.cartItems.value;
    cartItems.map((item,index)=>{
      if(item[0].id==id){
        cartItems.splice(index,1);
      }
    })
  }
}
