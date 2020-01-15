import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SkillsBoPage } from './skills-bo.page';

describe('SkillsBoPage', () => {
  let component: SkillsBoPage;
  let fixture: ComponentFixture<SkillsBoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkillsBoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SkillsBoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
