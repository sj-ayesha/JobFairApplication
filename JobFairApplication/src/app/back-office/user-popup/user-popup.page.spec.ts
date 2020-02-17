import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UserPopupPage } from './user-popup.page';

describe('UserPopupPage', () => {
  let component: UserPopupPage;
  let fixture: ComponentFixture<UserPopupPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserPopupPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UserPopupPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
