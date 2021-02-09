import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MpPage } from './mp.page';

describe('MpPage', () => {
  let component: MpPage;
  let fixture: ComponentFixture<MpPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MpPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MpPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
