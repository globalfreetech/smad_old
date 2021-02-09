import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SocialsharePage } from './socialshare.page';

describe('SocialsharePage', () => {
  let component: SocialsharePage;
  let fixture: ComponentFixture<SocialsharePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SocialsharePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SocialsharePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
