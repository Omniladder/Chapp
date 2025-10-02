import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFriendModal } from './add-friend-modal';

describe('AddFriendModal', () => {
  let component: AddFriendModal;
  let fixture: ComponentFixture<AddFriendModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddFriendModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddFriendModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
