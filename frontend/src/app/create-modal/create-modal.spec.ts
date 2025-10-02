import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateModal } from './create-modal';

describe('CreateModal', () => {
  let component: CreateModal;
  let fixture: ComponentFixture<CreateModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
