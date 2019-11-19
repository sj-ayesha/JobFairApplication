import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CandidateAddProfilePage } from './candidate-add-profile.page';

describe('CandidateAddProfilePage', () => {
  let component: CandidateAddProfilePage;
  let fixture: ComponentFixture<CandidateAddProfilePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CandidateAddProfilePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CandidateAddProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
