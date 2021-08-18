import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthService } from 'src/app/services/auth-service';
import { PollDataService } from 'src/app/services/poll-data-service';
import { NewPoll } from './newPoll';

@Component({
  selector: 'app-add-poll',
  templateUrl: './add-poll.component.html',
  styleUrls: ['./add-poll.component.scss']
})
export class AddPollComponent implements OnInit {
  userId: string;
  addForm: FormGroup;
  optionHints: string[] = ['Queen', 'Beatles', 'Metallica', 'Rolling Stones']

  constructor(private authService: AuthService,
    private pollDataService: PollDataService,
    private fb: FormBuilder) {

    this.authService.auth.user.subscribe(user => {
      if (user) {
        this.userId = user.uid;
      }
    });
  }

  ngOnInit(): void {
    // initialize form group
    this.addForm = this.fb.group({
      title: new FormControl('Qual a melhor banda de todos os tempos?', [Validators.required]),
      options: this.fb.array([
        new FormControl('Queen', [Validators.required]),
        new FormControl('Beatles', [Validators.required])
      ])
    });
  }

  get title() { return this.addForm.get('title'); }
  get options() { return this.addForm.get('options') as FormArray; }

  onAddOptionClick() {
    this.options.push(new FormControl('', [Validators.required]))
  }

  onDeleteOptionClick(index: number) {
    this.options.removeAt(index);
  }

  onSubmit() {
    if (this.addForm.invalid) return;

    var newPoll: NewPoll = {
      title: this.addForm.value['title'],
      creation: new Date().toISOString(),
      userId: this.userId,
      options: this.options.length,
      votes: 0
    };
    
    for (let index = 1; index <= this.options.length; index++) {
      const option = this.addForm.value['options'][index-1];
      
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