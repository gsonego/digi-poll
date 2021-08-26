import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
  poll: Poll | undefined;
  pollId: string | null;
  userId: string;
  editForm: FormGroup;
  optionHints: string[] = ['Queen', 'Beatles', 'Metallica', 'Rolling Stones']

  constructor(
    private authService: AuthService,
    private pollDataService: PollDataService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private toastr: ToastrService) {

    this.authService.auth.user.subscribe(user => {
      if (user) {
        this.userId = user.uid;
      }
    });
  }

  ngOnInit(): void {
    // First get the product id from the current route.
    const routeParams = this.route.snapshot.paramMap;
    this.pollId = routeParams.get('pollId');

    this.createForm();
    this.loadData();
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

  loadData() {
    if (!this.pollId)
      return;

    this.pollDataService
      .getPollData(this.pollId)
      .subscribe(res => {
        this.poll = res;
        this.loadForm(res);
      });
  }

  loadForm(formData: Poll | undefined) {
    if (!formData) return;

    // Loading data into a flat form is easy - just use patchValue
    this.editForm.patchValue(formData);

    // clear any existing option
    this.options.clear();

    const optionCount = formData.optionCount || 2;

    for (let index = 1; index <= optionCount; index++) {
      const option = this.createOption();
      option.patchValue(formData[`${index}_option`])
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
    if (!this.pollId) return;

    if (this.poll?.active) {
      this.toastr.error("Desculpe, esta enquete já foi iniciada e não pode mais ser editada!");
      return;
    }

    // prepare basic poll object
    var editedPoll: EditPoll = {
      title: this.editForm.value['title'],
      optionCount: this.options.length
    };

    // add options
    for (let index = 1; index <= this.options.length; index++) {
      const option = this.editForm.value['options'][index - 1];

      editedPoll[`${index}_option`] = option;
      editedPoll[`${index}_votes`] = 0;
    }

    this.pollDataService.editPoll(this.pollId, editedPoll)
      .then(result => {
        this.toastr.success("Enquete atualizada com sucesso");
        this.router.navigate(['/poll', this.pollId]);
      }).catch(error => {
        this.toastr.error("Oops, houve um erro ao tentar atualizar a enquete!")
        console.log(error);
      });
  }
}
