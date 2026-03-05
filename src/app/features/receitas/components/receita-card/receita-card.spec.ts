import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceitaCard } from './receita-card';

describe('ReceitaCard', () => {
  let component: ReceitaCard;
  let fixture: ComponentFixture<ReceitaCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReceitaCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReceitaCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
