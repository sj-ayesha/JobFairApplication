import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { JobsPopupPage } from './jobs-popup.page';

describe('JobsPopupPage', () => {
  let component: JobsPopupPage;
  let fixture: ComponentFixture<JobsPopupPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobsPopupPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(JobsPopupPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
