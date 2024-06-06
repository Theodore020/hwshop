import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit } from '@angular/core';
import { SafeWidthComponent } from '../../components/safe-width/safe-width.component';
import { TopbarComponent } from '../../components/topbar/topbar.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { TabbarComponent } from '../../components/tabbar/tabbar.component';
import { CommonModule } from '@angular/common';
import { ShopServiceService } from '../../shop-service.service';
import { map } from 'rxjs/operators';
import { RouterModule } from '@angular/router';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-shop-car',
  standalone: true,
  imports: [
    SafeWidthComponent,
    TopbarComponent,
    NavbarComponent,
    TabbarComponent,
    CommonModule,
    RouterModule,
    NzStepsModule,
    FormsModule
  ],
  templateUrl: './shop-car.component.html',
  styleUrl: './shop-car.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ShopCarComponent implements OnInit {
  isAllSelected = false;
  data: any;
  totalMoney: number = 0;
  cartItems$ = this.shopservice.cartItems$;
  constructor(private shopservice: ShopServiceService) {
    this.cartItems$.pipe(map(item => {
      return item
    })).subscribe(item => {
      this.data = item;
      console.log(this.data);
    })
  }
  deleteItem(id: number) {
    this.shopservice.deleteFromCart(id)
    this.totalMoney = 0
    this.data.map((item: any) => {
      if (item[4] == true) {
        this.totalMoney += item[0].money * item[1]
      }
    })
  }
  reduce(id: number) {
    this.data.map((p: any) => {
      if (p[0].id === id) {
        if (p[1] < 1) {
          p[1] = 0
        } else {
          p[1]--
          if (p[4] == true) {
            this.totalMoney -= p[0].money
          }

        }

      }
    })

  }
  add(id: number) {
    this.data.map((p: any) => {
      if (p[0].id === id) {
        p[1]++
        if (p[4] == true) {
          this.totalMoney += p[0].money
        }

      }
    })
  }
  toggleAll(checked: boolean) {
    this.totalMoney = 0
    this.data.map((item: any) => {
      if (checked == true) {
        item[4] = checked
        this.totalMoney += item[0].money * item[1]
      } else {
        item[4] = false
        this.totalMoney -= item[0].money * item[1]
        if (this.totalMoney < 0) {
          this.totalMoney = 0
        }
      }
    })
  }
  updateSelection(id: number) {
    this.isAllSelected = this.data.every((item: any) => item[4] == true);
    this.data.map((item: any) => {
      if (item[0].id === id) {
        if (item[4] == true) {
          this.totalMoney += item[0].money * item[1]
        } else {
          this.totalMoney -= item[0].money * item[1]
        }
      }
    })
  }
  ngOnInit(): void {
    this.data.map((item: any) => {
      if (item[4] == true) {
        this.totalMoney += item[0].money * item[1]
      }
    })
  }
}
