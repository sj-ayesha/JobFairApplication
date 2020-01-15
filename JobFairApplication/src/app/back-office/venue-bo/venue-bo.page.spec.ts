import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VenueBoPage } from './venue-bo.page';

describe('VenueBoPage', () => {
  let component: VenueBoPage;
  let fixture: ComponentFixture<VenueBoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VenueBoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VenueBoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
