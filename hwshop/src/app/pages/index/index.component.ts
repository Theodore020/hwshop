import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit } from '@angular/core';
import { SafeWidthComponent } from '../../components/safe-width/safe-width.component';
import { register } from 'swiper/element/bundle';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { TabbarComponent } from '../../components/tabbar/tabbar.component';
import { TopbarComponent } from '../../components/topbar/topbar.component';
import { RouterModule } from '@angular/router';
import API from '../../API';


register();
@Component({
  selector: 'app-index',
  standalone: true,
  imports: [SafeWidthComponent,NavbarComponent,CommonModule,TabbarComponent,TopbarComponent,RouterModule],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})

export class IndexComponent implements OnInit{
  
  list:any=[]
  
  ngOnInit(): void {
   API.listInfo.getAllList().then(result=>{
     this.list=result.data
     console.log(this.list);
   })
  }
}
 