import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListCandidateJobComponent } from './list-candidate-job.component';

describe('ListCandidateJobComponent', () => {
  let component: ListCandidateJobComponent;
  let fixture: ComponentFixture<ListCandidateJobComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListCandidateJobComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListCandidateJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
