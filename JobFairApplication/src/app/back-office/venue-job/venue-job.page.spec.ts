import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VenueJobPage } from './venue-job.page';

describe('VenueJobPage', () => {
  let component: VenueJobPage;
  let fixture: ComponentFixture<VenueJobPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VenueJobPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VenueJobPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
