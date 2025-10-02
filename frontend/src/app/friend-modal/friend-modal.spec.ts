import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendModal } from './friend-modal';

describe('FriendModal', () => {
  let component: FriendModal;
  let fixture: ComponentFixture<FriendModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FriendModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FriendModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
