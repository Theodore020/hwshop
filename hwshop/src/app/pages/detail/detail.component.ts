import { Component, OnInit, } from '@angular/core';
import { SafeWidthComponent } from '../../components/safe-width/safe-width.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { TopbarComponent } from '../../components/topbar/topbar.component';
import { TabbarComponent } from '../../components/tabbar/tabbar.component';
import { ActivatedRoute, RouterModule } from '@angular/router';
import API from '../../API';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule, ModalModule } from 'ng-devui';
import { DialogService } from 'ng-devui/modal';
import { ShopServiceService } from '../../shop-service.service';
@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [SafeWidthComponent, NavbarComponent, TopbarComponent, TabbarComponent, RouterModule, CommonModule, FormsModule,FormsModule,ModalModule ,ButtonModule],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css'
})
export class DetailComponent implements OnInit {
  public id: number = 0;
  public data: any = {};
  public listId: number = 0;
  selectedColor: number = 1;
  selectedSize: number = 1;
  colorText: string = "雅丹黑";
  sizeText: string = "12GB+512GB";
  count:number=1;
  currentMoney:number=0;
  shopData:any=[];
  colorData: any = [
    { name: "雅丹黑", id: 1 },
    { name: "雅川青", id: 2 },
    { name: "白沙银", id: 3 },
    { name: "南糯紫", id: 4 },
  ]
  sizeData: any = [
    { name: "12GB+512GB", id: 1 },
    { name: "12GB+1TB", id: 2 },
    { name: "12GB+256GB", id: 3 },
  ];
  config = {
    id: 'dialog-service',
    width: '346px',
    maxHeight: '600px',
    zIndex: 1050,
    backdropCloseable: true,
    html: true,
  };
  isDisabled:boolean=true;
  selected:boolean= false
  constructor(private route: ActivatedRoute,private dialogService: DialogService,private shopService:ShopServiceService) {

  }

  queryData() {
    this.route.paramMap.subscribe(params => {
      this.id = this.route.snapshot.params['id']
      return API.goodsInfo.findById({ id: this.id })
        .then(result => {
          this.data = result.data[0];
          this.listId = result.data[0].category_id;
          this.currentMoney=this.data.money;
        }).catch(err => {
          console.log(err);
        })
    })
  }
  clickColor(event: Event, i: number) {
    let target = event.target as HTMLElement;
    let text = target.textContent || target.innerText;
    this.colorText = text;
    this.selectedColor = i+1;
  }
  clickSize(event: Event, i: number) {
    let target = event.target as HTMLElement;
    let text = target.textContent || target.innerText;
    this.sizeText = text;
    this.selectedSize = i+1;
  }
  add(){
    this.count++;
    this.currentMoney=this.count*this.data.money;
  }
  reduce(){
    this.count--;
    this.currentMoney=this.count*this.data.money;
    if(this.count<1){
      this.count=1;
      this.currentMoney=this.data.money;
    }
  }
  goShopCar(dialogtype?: string){
    const result=this.dialogService.open({
      ...this.config,
      dialogtype: dialogtype,
      content:"成功加入购物车",
      buttons:[{
        cssClass: 'primary',
        text: 'Ok',
        handler: ($event: Event) => {
          result.modalInstance.hide();
        },
      },]
    })
    this.shopData.push(this.data,this.count,this.colorText,this.sizeText,this.selected)
    this.shopService.addToCart(this.shopData);
  }
  goBuy(){
    this.shopData.push(this.data,this.count,this.colorText,this.sizeText,this.selected)
    this.shopService.addToCart(this.shopData);
  }
  ngOnInit(): void {
    this.queryData()
    
  }

}
