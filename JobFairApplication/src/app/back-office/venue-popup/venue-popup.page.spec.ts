import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VenuePopupPage } from './venue-popup.page';

describe('VenuePopupPage', () => {
  let component: VenuePopupPage;
  let fixture: ComponentFixture<VenuePopupPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VenuePopupPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VenuePopupPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
