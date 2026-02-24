import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceitaEdit } from './receita-edit';

describe('ReceitaEdit', () => {
  let component: ReceitaEdit;
  let fixture: ComponentFixture<ReceitaEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReceitaEdit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReceitaEdit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
