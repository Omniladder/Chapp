import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileModal } from './profile-modal';

describe('ProfileModal', () => {
  let component: ProfileModal;
  let fixture: ComponentFixture<ProfileModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
