/// <reference types="jasmine" />

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { TutorialsListComponent } from './tutorials-list.component';
import { TutorialDetailsComponent } from '../tutorial-details/tutorial-details.component';
import { TutorialService } from '../../services/tutorial.service';

describe('TutorialsListComponent', () => {
  let component: TutorialsListComponent;
  let fixture: ComponentFixture<TutorialsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TutorialsListComponent, TutorialDetailsComponent],
      imports: [ReactiveFormsModule, RouterTestingModule],
      providers: [{
        provide: TutorialService,
        useValue: { getAll: () => of([]) }
      }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TutorialsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
