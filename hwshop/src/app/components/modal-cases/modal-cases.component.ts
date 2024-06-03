import { Component, Input, OnInit } from '@angular/core';
import { DValidateRules, FormLayout, FormModule } from 'ng-devui/form';
import { FormsModule } from '@angular/forms';
import { TextInputModule } from 'ng-devui/text-input';
import API from "../../API/index"
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-modal-cases',
  standalone: true,
  imports: [FormModule, FormsModule, TextInputModule, CommonModule],
  templateUrl: './modal-cases.component.html',
  styleUrl: './modal-cases.component.css'
})
export class ModalCasesComponent implements OnInit {
  @Input() data: any;
  des = '';
  name = '';
  tel = '';
  areaData: any = []
  provinceList: any[] = [];
  cityList: any[] = [];
  areaList: any[] = [];
  layoutDirection: FormLayout = FormLayout.Vertical;
  provinceId = 0;
  cityId = 0;
  areaId = 0;
  formRules: { [key: string]: DValidateRules } = {
    rule: { message: 'The form verification failed, please check.', messageShowType: 'text' },
    nameRules: {
      validators: [
        { required: true },
        {
          pattern: /[a-zA-Z\u4e00-\u9fff]+$/,
          message: {
            'zh-cn': '仅允许输入数字与大小写字母',
          },
        }
      ]
    },
    telRules: {
      validators: [
        { required: true },
        {
          pattern: /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/,
          message: {
            'zh-cn': '输入正确的手机号',
          },
        }
      ]
    }
  }
  submitForm({ valid, directive }: { valid: boolean; directive: FormModule }) {
    console.log(directive);
  }
  formChange() {
    if (this.des && this.name && this.tel) {
      this.data.canConfirm(true);
    }
  }
  getAreaData() {
    API.goodsInfo.getAreaLevelList().then(result => {
      this.areaData = result.data;
      this.provinceList = result.data.provinceList;
    })
  }
  getProvinceList(id: number) {
    this.cityList = this.areaData.cityList.filter((item: any) => item.parent_id == id);
  }
  getCityList(id: number) {
    this.areaList = this.areaData.areaList.filter((item: any) => item.parent_id == id);
  }
  ngOnInit(): void {
    this.getAreaData()
  }

}
