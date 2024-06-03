import { Routes } from '@angular/router';
import { IndexComponent } from './pages/index/index.component';
import { ListComponent } from './pages/list/list.component';
import { DetailComponent } from './pages/detail/detail.component';
import { ShopCarComponent } from './pages/shop-car/shop-car.component';
import { SettlementComponent } from './pages/settlement/settlement.component';
export const routes: Routes = [
    {
        path: "",
        redirectTo: "index",
        pathMatch: "full"
    },
    {
        path: "index",
        component: IndexComponent,
    },
    {
        path: "list/:id",
        component: ListComponent
    },
    {
        path: "detail/:id",
        component: DetailComponent
    },
    {
        path: "shopcar",
        component: ShopCarComponent
    },
    {
        path:"settlement",
        component:SettlementComponent
    }
];



