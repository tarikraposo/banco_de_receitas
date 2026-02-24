import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceitaCreate } from './receita-create';

describe('ReceitaCreate', () => {
  let component: ReceitaCreate;
  let fixture: ComponentFixture<ReceitaCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReceitaCreate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReceitaCreate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
