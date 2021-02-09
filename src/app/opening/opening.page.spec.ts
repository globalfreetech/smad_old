import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OpeningPage } from './opening.page';

describe('OpeningPage', () => {
  let component: OpeningPage;
  let fixture: ComponentFixture<OpeningPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpeningPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OpeningPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
