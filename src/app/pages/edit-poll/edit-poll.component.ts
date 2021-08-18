import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { EditPoll } from 'src/app/models/editPoll';
import { Poll } from 'src/app/models/poll.model';

import { AuthService } from 'src/app/services/auth-service';
import { PollDataService } from 'src/app/services/poll-data-service';

@Component({
  selector: 'app-edit-poll',
  templateUrl: './edit-poll.component.html',
  styleUrls: ['./edit-poll.component.scss']
})
export class EditPollComponent implements OnInit {

  userId: string;
  editForm: FormGroup;
  optionHints: string[] = ['Queen', 'Beatles', 'Metallica', 'Rolling Stones']

  constructor(
    private authService: AuthService,
    private pollDataService: PollDataService,
    private route: ActivatedRoute,
    private fb: FormBuilder) {

    this.authService.auth.user.subscribe(user => {
      if (user) {
        this.userId = user.uid;
      }
    });
  }

  ngOnInit(): void {
    // First get the product id from the current route.
    const routeParams = this.route.snapshot.paramMap;
    const pollId = routeParams.get('pollId');

    this.createForm();
    this.loadData(pollId || "");
  }

  createForm() {
    // initialize form group
    this.editForm = this.fb.group({
      title: new FormControl('', [Validators.required]),
      options: this.fb.array([])
    });
  }

  // createOption() {
  //   return this.fb.group({
  //     title: ['', [Validators.minLength(this.minSumLen)]],
  //     image: ['', [Validators.minLength(this.minDesLen)]],
  //     votes: ['', [Validators.minLength(this.minDesLen)]],
  //   });
  // }

  createOption() {
    return new FormControl('', [Validators.required]);
  }

  loadData(pollId: string) {
    this.pollDataService
    .getPollData(pollId)
    .subscribe(res => {
      this.loadForm(res);
    });
  }

  loadForm(formData: Poll | undefined) {
    if (!formData) return;

    console.log(formData);

    // Loading data into a flat form is easy - just use patchValue
    this.editForm.patchValue(formData);

    for (let index = 1; index <= formData.optionCount; index++) {
      const option = this.createOption();
      option.patchValue(formData[index + '.option'])
      this.options.push(option);
    }
  }

  get title() {
    return this.editForm.get('title');
  }

  get options() {
    return this.editForm.get('options') as FormArray;
  }

  onAddOptionClick() {
    this.options.push(new FormControl('', [Validators.required]))
  }

  onDeleteOptionClick(index: number) {
    this.options.removeAt(index);
  }

  onSubmit() {
    if (this.editForm.invalid) return;

    var newPoll: EditPoll = {
      title: this.editForm.value['title'],
      creation: new Date().toISOString(),
      userId: this.userId,
      optionCount: this.options.length,
      votes: 0
    };

    for (let index = 1; index <= this.options.length; index++) {
      const option = this.editForm.value['options'][index - 1];

      newPoll[index + ".option"] = option;
      newPoll[index + ".votes"] = 0;
    }

    this.pollDataService.addPoll(newPoll)
      .then(result => {
        console.log(result);
      }).catch(error => {
        console.log(error);
      });
  }
}
