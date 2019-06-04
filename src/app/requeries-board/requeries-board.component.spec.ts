import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequeriesBoardComponent } from './requeries-board.component';

describe('RequeriesBoardComponent', () => {
  let component: RequeriesBoardComponent;
  let fixture: ComponentFixture<RequeriesBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequeriesBoardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequeriesBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
