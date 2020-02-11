import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ExportFilesPage } from './export-files.page';

describe('ExportFilesPage', () => {
  let component: ExportFilesPage;
  let fixture: ComponentFixture<ExportFilesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExportFilesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ExportFilesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
