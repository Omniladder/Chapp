import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateScreen } from './create-screen';

describe('CreateScreen', () => {
  let component: CreateScreen;
  let fixture: ComponentFixture<CreateScreen>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateScreen]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateScreen);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
