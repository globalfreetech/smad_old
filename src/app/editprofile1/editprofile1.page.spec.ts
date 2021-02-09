import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Editprofile1Page } from './editprofile1.page';

describe('Editprofile1Page', () => {
  let component: Editprofile1Page;
  let fixture: ComponentFixture<Editprofile1Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Editprofile1Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Editprofile1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
