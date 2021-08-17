import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-poll',
  templateUrl: './add-poll.component.html',
  styleUrls: ['./add-poll.component.scss']
})
export class AddPollComponent implements OnInit {
  addForm: FormGroup;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    // initialize form group
    this.addForm = this.fb.group({
      title: new FormControl('', [Validators.required]),
      options: this.fb.array([
        new FormControl('', [Validators.required]),
        new FormControl('', [Validators.required])
      ])
    });
  }

  get title() { return this.addForm.get('title'); }
  get options() { return this.addForm.get('options') as FormArray; }

  onSubmit() {
    if (this.addForm.invalid) return;

    console.log("valid!", this.addForm);
  }

}