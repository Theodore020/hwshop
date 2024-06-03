import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { SafeWidthComponent } from '../../components/safe-width/safe-width.component';
import { TopbarComponent } from '../../components/topbar/topbar.component';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import API from "../../API/index"
import { CommonModule } from '@angular/common';
import { TabbarComponent } from '../../components/tabbar/tabbar.component';
import { FormsModule } from '@angular/forms';
import { InputNumberModule } from 'ng-devui';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [NavbarComponent, SafeWidthComponent, TopbarComponent, RouterModule, HttpClientModule, CommonModule, TabbarComponent, FormsModule, InputNumberModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ListComponent implements OnInit {
  public list: any[] = [];
  public searchParams: any = {
    category_id: this.route.snapshot.params['id'],
    pageIndex: 1,
    startMoney: null,
    endMoney: null
  }
  public reg: RegExp = /^(-|\+)?\d*$/;
  constructor(private route: ActivatedRoute) {

  }
  getListByPage() {
    this.route.paramMap.subscribe(params => {
      // this.id = this.route.snapshot.params['id']
      return API.goodsInfo.getListByPageForCategory(this.searchParams)
        .then(result => {
          this.list = result.data.listData
          console.log(this.list);
        }).catch(err => {
          console.log(err);
        })
    })
  }
  async searchMoney() {
    this.searchParams.pageIndex = 1;
    this.getListByPage()
  }
  ngOnInit(): void {
    this.getListByPage()

  }

}
