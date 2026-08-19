import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { TutorialService } from '../../services/tutorial.service';

@Component({
  selector: 'app-add-tutorial',
  templateUrl: './add-tutorial.component.html',
  styleUrls: ['./add-tutorial.component.css'],
})
export class AddTutorialComponent {
  tutorialForm = this.formBuilder.nonNullable.group({
    title: ['', Validators.required],
    description: ['', Validators.required]
  });
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private tutorialService: TutorialService
  ) {}

  saveTutorial(): void {
    if (this.tutorialForm.invalid) {
      this.tutorialForm.markAllAsTouched();
      return;
    }

    const data = {
      title: this.tutorialForm.controls.title.value,
      description: this.tutorialForm.controls.description.value
    };

    this.tutorialService.create(data).subscribe({
      next: (res) => {
        console.log(res);
        this.submitted = true;
      },
      error: (e) => console.error(e)
    });
  }

  newTutorial(): void {
    this.submitted = false;
    this.tutorialForm.reset();
  }
}
