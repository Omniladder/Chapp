import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginModal } from './login-modal';

describe('LoginModal', () => {
  let component: LoginModal;
  let fixture: ComponentFixture<LoginModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
