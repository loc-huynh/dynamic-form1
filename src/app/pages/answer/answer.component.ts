import { Component } from '@angular/core';
import { StoreService } from '../../services/store.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.scss']
})
export class AnswerComponent {
  public questionList: any = [];

  constructor(
    private StoreService: StoreService,
    private router: Router) {
    this.StoreService.store.subscribe(res => {
      this.questionList = res;
    })
  }


  back() {
    this.router.navigate(['/form/builder']);
  }
}
