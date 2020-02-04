import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { JobsBoPage } from './jobs-bo.page';

describe('JobsBoPage', () => {
  let component: JobsBoPage;
  let fixture: ComponentFixture<JobsBoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobsBoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(JobsBoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
