import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatScreen } from './chat-screen';

describe('ChatScreen', () => {
  let component: ChatScreen;
  let fixture: ComponentFixture<ChatScreen>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatScreen]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatScreen);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
