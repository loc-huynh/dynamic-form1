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

  addNewModalOpen(): void {
    this.dialog.open(FormModalComponent, { disableClose: true }).afterClosed().subscribe(res => {
      this.questionList.push(res);

    });
  }

  changeValue(i: number, answer: string) {
    let value = this.questionList[i]['value'];
    if (!value) this.questionList[i]['value'] = [];
    // let index = this.questionList[i]['value'].findIndex(i => i == answer)
    this.questionList[i]['value'].push(answer);
  }

  review() {
    this.StoreService.store.next(this.questionList);
    this.router.navigate(['/form/answer']);
  }

}
