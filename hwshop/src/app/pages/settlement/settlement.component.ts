import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SafeWidthComponent } from '../../components/safe-width/safe-width.component';
import { TopbarComponent } from '../../components/topbar/topbar.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { TabbarComponent } from '../../components/tabbar/tabbar.component';
import { DialogService, ModalModule } from 'ng-devui/modal';
import { ModalCasesComponent } from '../../components/modal-cases/modal-cases.component';
import { ShopServiceService } from '../../shop-service.service';
import { map } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { NzStepsModule } from 'ng-zorro-antd/steps';
@Component({
  selector: 'app-settlement',
  standalone: true,
  imports: [SafeWidthComponent, TopbarComponent, NavbarComponent, TabbarComponent, ModalCasesComponent, ModalModule,CommonModule,NzStepsModule ],
  templateUrl: './settlement.component.html',
  styleUrl: './settlement.component.css'
})
export class SettlementComponent implements OnInit{
  @ViewChild('addressBox', { static: true }) addressBoxElement!:ElementRef
  provinceId = 0;
  cityId = 0;
  areaId = 0;
  des = '';
  name = '';
  tel = '';
  province = '';
  city = '';
  area = '';
  cartItems$ = this.shopservice.cartItems$;
  data: any;
  totalMoney:number=0;
  constructor(private dialogService: DialogService, private shopservice: ShopServiceService) {
    this.cartItems$.pipe(map(item => {
      return item
    })).subscribe(item => {
      this.data = item;
      console.log(this.data);
    })
  }


  openStandardDialog(dialogtype?: string) {
    const results = this.dialogService.open({
      id: 'dialog-service',
      width: '600px',
      maxHeight: '600px',
      title: '添加地址',
      content: ModalCasesComponent,
      backdropCloseable: true,
      dialogtype: dialogtype,
      buttons: [
        {
          cssClass: 'primary',
          text: '确定',
          disabled: true,
          handler: ($event: Event) => {
            this.provinceId = results.modalContentInstance.provinceId;
            this.cityId = results.modalContentInstance.cityId;
            this.areaId = results.modalContentInstance.areaId;
            this.des = results.modalContentInstance.des;
            this.name = results.modalContentInstance.name;
            this.tel = results.modalContentInstance.tel;
            this.province = results.modalContentInstance.provinceList.find((item: any) => item.id == this.provinceId).area_name;
            this.city = results.modalContentInstance.cityList.find((item: any) => item.id == this.cityId).area_name;
            this.area = results.modalContentInstance.areaList.find((item: any) => item.id == this.areaId).area_name;
            this.addressBoxElement.nativeElement.style.display = "block"
            results.modalInstance.hide();
          },
        },
        {
          id: 'btn-cancel',
          cssClass: 'common',
          text: '取消',
          handler: ($event: Event) => {
            results.modalInstance.hide();
          },
        },
      ],
      data: {
        canConfirm: (value: boolean) => {
          results.modalInstance.updateButtonOptions([{ disabled: !value }]);
        }
      },
    });

  }
  ngOnInit(): void {
    this.data.map((item:any)=>{
      this.totalMoney+=item[0].money*item[1]
    })
    this.addressBoxElement.nativeElement.style.display = "none"
  }
}
