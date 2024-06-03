import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-tabbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tabbar.component.html',
  styleUrl: './tabbar.component.css'
})
export class TabbarComponent {
  public tabTitle:Array<string> = ["购物指南","售后服务","服务支持","特色服务","关于我们","友情链接"];
  public tabContent:Array<string>[] = [
    ["享0分期利息","以旧换新","众测活动","企业购","O2O采购","教育购"],
    ["门店维修","保修政策","防伪查询","退换货政策","手机寄修服务"],
    ["服务店查询","维修备件价格","维修服务","上门安装","为题排查"],
    ["防伪查询","补购保障","以旧换新"],
    ["公司介绍","华为零售店","商家中心","意见反馈","规则中心"],
    ["华为集团","华为消费者服务","华为云","华为应用市场","华为心声社区"],
  ];
}
