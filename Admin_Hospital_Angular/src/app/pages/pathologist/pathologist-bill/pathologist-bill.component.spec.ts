import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PathologistBillComponent } from './pathologist-bill.component';

describe('PathologistBillComponent', () => {
  let component: PathologistBillComponent;
  let fixture: ComponentFixture<PathologistBillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PathologistBillComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PathologistBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
