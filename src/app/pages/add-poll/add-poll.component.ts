import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

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
  pollImageUrl: string;
  addForm: FormGroup;
  selectedFile: File;
  imageInfo: any;
  uploadPercent: Observable<number | undefined>;
  downloadURL: Observable<string>;
  optionHints: string[] = ['Queen', 'Beatles', 'Metallica', 'Rolling Stones']

  constructor(private authService: AuthService,
    private pollDataService: PollDataService,
    private storage: AngularFireStorage,
    private router: Router,
    private fb: FormBuilder,
    private toastr: ToastrService) {

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

    // load image into storage
    // load image into storage
    const filePath = this.selectedFile.name;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, this.selectedFile);

    // observe percentage changes
    this.uploadPercent = task.percentageChanges();

    // get notified when the download URL is available
    task.snapshotChanges()
      .pipe(finalize(() => {
        fileRef.getDownloadURL().subscribe((url) => {
          console.log("URL: ", url);
          this.saveData(url);
        });
      }))
      .subscribe()    
  }

  saveData(imageUrl: string) {
    var newPoll: NewPoll = {
      title: this.addForm.value['title'],
      creation: new Date().toISOString(),
      userId: this.userId,
      imageUrl: imageUrl,
      optionCount: this.options.length,
      votes: 0,
      active: false
    };

    for (let index = 1; index <= this.options.length; index++) {
      const option = this.addForm.value['options'][index - 1];

      newPoll[index + "_option"] = option;
      newPoll[index + "_votes"] = 0;
    }

    this.pollDataService.addPoll(newPoll)
      .then(result => {
        this.toastr.success("Enquete criada com sucesso");
        this.router.navigate(['/poll', result.id]);
      }).catch(error => {
        this.toastr.error('Oops, houve um erro ao tentar criar nova enquete.');
        console.log(error);
      });    
  }

  onSelectFile(event: any) {
    if (!event.target) return;
    if (!event.target.files) return;

    // keep file for future use
    this.selectedFile = event.target.files[0];

    this.imageInfo = `type: ${this.selectedFile.type} -- size: ${this.selectedFile.size}`;

    var reader = new FileReader();
    reader.readAsDataURL(this.selectedFile);
    reader.onload = (res: any) => {
      this.pollImageUrl = res.target.result;
    }
  }
}