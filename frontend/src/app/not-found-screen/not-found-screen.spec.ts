import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotFoundScreen } from './not-found-screen';

describe('NotFoundScreen', () => {
  let component: NotFoundScreen;
  let fixture: ComponentFixture<NotFoundScreen>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotFoundScreen]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotFoundScreen);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
