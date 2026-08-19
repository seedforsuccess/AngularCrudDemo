/// <reference types="jasmine" />

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';

import { AddTutorialComponent } from './add-tutorial.component';
import { TutorialService } from '../../services/tutorial.service';

describe('AddTutorialComponent', () => {
  let component: AddTutorialComponent;
  let fixture: ComponentFixture<AddTutorialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddTutorialComponent],
      imports: [ReactiveFormsModule],
      providers: [{
        provide: TutorialService,
        useValue: { create: () => of({}) }
      }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTutorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
