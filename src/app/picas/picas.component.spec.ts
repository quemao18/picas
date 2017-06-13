import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PicasComponent } from './picas.component';

describe('PicasComponent', () => {
  let component: PicasComponent;
  let fixture: ComponentFixture<PicasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PicasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PicasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
