import { Component } from '@angular/core';
import { MatDialog, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { AbstractControl, Form, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-modal',
  templateUrl: './form-modal.component.html',
  styleUrls: ['./form-modal.component.scss']
})
export class FormModalComponent {

  qType = [{
    text: 'Checkbox List',
    value: 'checkbox'
  }, {
    text: 'Paragraph answer',
    value: 'text'
  }];

  constructor(public dialogRef: MatDialogRef<FormModalComponent>,
    private fb: FormBuilder
  ) { }

  form = this.fb.group({
    require: [false],
    other: [false],
    type: ['', Validators.required],
    question: ['', Validators.required],
    answerOptions: this.fb.array([])
  })

  get answerOptions() {
    return this.form.controls["answerOptions"] as FormArray;
  }

  toFormGroup(form: AbstractControl) {
    return form as FormGroup;
  }

  changeType() {
    console.log('change');
    if (this.form.controls['type'].value == 'checkbox' && this.form.controls["answerOptions"].length == 0)
      this.addAnswerOption();
    if (this.form.controls['type'].value == 'text')
      this.form.controls["answerOptions"].clear();
  }

  addAnswerOption() {
    const f = this.fb.group(
      { option: ['', Validators.required] }
    );
    this.answerOptions.push(f);
  }

  changeCheckbox(field: string) {
    if (field == 'other')
      this.form.controls['other'].setValue(!this.form.controls['other'].value);
    else
      this.form.controls['require'].setValue(!this.form.controls['require'].value);
  }

  submit() {
    console.log(this.form.getRawValue());

    this.dialogRef.close({ ...this.form.getRawValue() })
  }
}
