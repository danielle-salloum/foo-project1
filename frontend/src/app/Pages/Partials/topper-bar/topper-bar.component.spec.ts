import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopperBarComponent } from './topper-bar.component';

describe('TopperBarComponent', () => {
  let component: TopperBarComponent;
  let fixture: ComponentFixture<TopperBarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TopperBarComponent]
    });
    fixture = TestBed.createComponent(TopperBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
