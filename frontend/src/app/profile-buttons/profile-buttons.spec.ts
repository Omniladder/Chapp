import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileButtons } from './profile-buttons';

describe('ProfileButtons', () => {
  let component: ProfileButtons;
  let fixture: ComponentFixture<ProfileButtons>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileButtons]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileButtons);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
