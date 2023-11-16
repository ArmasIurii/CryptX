import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoteCoinComponent } from './vote-coin.component';

describe('VoteCoinComponent', () => {
  let component: VoteCoinComponent;
  let fixture: ComponentFixture<VoteCoinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VoteCoinComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VoteCoinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
