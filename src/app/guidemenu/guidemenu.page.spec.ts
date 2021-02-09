import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GuidemenuPage } from './guidemenu.page';

describe('GuidemenuPage', () => {
  let component: GuidemenuPage;
  let fixture: ComponentFixture<GuidemenuPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuidemenuPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GuidemenuPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
