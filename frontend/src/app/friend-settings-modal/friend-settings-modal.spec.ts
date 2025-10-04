import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendSettingsModal } from './friend-settings-modal';

describe('FriendSettingsModal', () => {
  let component: FriendSettingsModal;
  let fixture: ComponentFixture<FriendSettingsModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FriendSettingsModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FriendSettingsModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
