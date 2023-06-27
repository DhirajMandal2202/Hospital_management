import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMedicinesBillComponent } from './create-medicines-bill.component';

describe('CreateMedicinesBillComponent', () => {
  let component: CreateMedicinesBillComponent;
  let fixture: ComponentFixture<CreateMedicinesBillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateMedicinesBillComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateMedicinesBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
