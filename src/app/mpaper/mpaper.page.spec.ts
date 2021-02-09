import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MpaperPage } from './mpaper.page';

describe('MpaperPage', () => {
  let component: MpaperPage;
  let fixture: ComponentFixture<MpaperPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MpaperPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MpaperPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
