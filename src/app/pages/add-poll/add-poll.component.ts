import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth-service';
import { PollDataService } from 'src/app/services/poll-data-service';
import { NewPoll } from '../../models/newPoll';

@Component({
  selector: 'app-add-poll',
  templateUrl: './add-poll.component.html',
  styleUrls: ['./add-poll.component.scss']
})
export class AddPollComponent implements OnInit {
  userId: string = "";
  addForm: FormGroup;
  optionHints: string[] = ['Queen', 'Beatles', 'Metallica', 'Rolling Stones']

  constructor(private authService: AuthService,
    private pollDataService: PollDataService,
    private router: Router,
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
      title: new FormControl('', [Validators.required]),
      options: this.fb.array([
        new FormControl('', [Validators.required]),
        new FormControl('', [Validators.required])
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
      optionCount: this.options.length,
      votes: 0
    };
    
    for (let index = 1; index <= this.options.length; index++) {
      const option = this.addForm.value['options'][index-1];
      
      newPoll[index + ".option"] = option;
      newPoll[index + ".votes"] = 0;
    }

    this.pollDataService.addPoll(newPoll)
      .then(result => {
        alert('Enquete criada com sucesso!');

        this.router.navigate(['/poll', result.id]);
      }).catch(error => {
        alert('Oops, houve um erro ao tentar criar nova enquete.');  
        console.log(error);
      });
  }
}