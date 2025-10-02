import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFriendDiv } from './add-friend-div';

describe('AddFriendDiv', () => {
  let component: AddFriendDiv;
  let fixture: ComponentFixture<AddFriendDiv>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddFriendDiv]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddFriendDiv);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
