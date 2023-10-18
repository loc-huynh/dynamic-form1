import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormModalComponent } from '../../components/form-modal/form-modal.component';
import { StoreService } from '../../services/store.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {

  constructor(
    public dialog: MatDialog,
    private StoreService: StoreService,
    private router: Router
  ) {
    this.StoreService.store.subscribe(res => {
      if (res.length > 0)
        this.questionList = res;
      console.log(res || this.questionList);
    })
  }

  public questionList: any = [
    // {
    //   answerOptions: [{ option: '1' }, { option: '2' }],
    //   other: false,
    //   question: "sdsada",
    //   require: true,
    //   type: "checkbox"
    // },
    // {
    //   answerOptions: [{ option: '1' }, { option: '2' }],
    //   other: true,
    //   question: "sdsada",
    //   require: true,
    //   type: "checkbox"
    // },
    // {
    //   answerOptions: [],
    //   other: false,
    //   question: "sdsada",
    //   require: true,
    //   type: "text"
    // },
  ];
  public errorMessage: any[] = [];

  addNewModalOpen(): void {
    this.dialog.open(FormModalComponent, { disableClose: true }).afterClosed().subscribe(res => {
      if(res) {
        this.questionList.push(res);
      }
    });
  }

  changeValue(i: number, answer: string) {
    if (!Array.isArray(this.questionList[i]['value'])) this.questionList[i]['value'] = [];

    // TODO: should find by id instead
    const itemIndex = this.questionList[i]['value'].findIndex((val: string) => val === answer)
    if (itemIndex !== -1) {
      this.questionList[i]['value'].splice(itemIndex, 1);
    } else {
      this.questionList[i]['value'].push(answer);
    }
  }
  
  async validateInfo(infors: any[]): Promise<boolean> {
    let res=true;
    this.errorMessage = [];
    for (const info of infors) {
      if (info.require) {
        if (info.type === 'checkbox') {
          if (!info.value || info.value.length === 0 || (info.value.includes('other') && !info.valueOther)) {
            this.errorMessage.push(`field ${info.question} is required. Plz answer the question.`);
            res = false;
          }
        } else if (info.type === 'text') {
          if (!info.value) {
            this.errorMessage.push(`field ${info.question} is required. Plz answer the question.`);
            res = false;
          }
        }
      }
    }
    return res;
  }

  async review() {
    const isValid = await this.validateInfo(this.questionList);
    if(isValid) {
      this.StoreService.store.next(this.questionList);
      this.router.navigate(['/form/answer']);
    }
  }

}
