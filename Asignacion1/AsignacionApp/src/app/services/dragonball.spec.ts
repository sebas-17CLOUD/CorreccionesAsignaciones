import { TestBed } from '@angular/core/testing';
import { DragonBallService } from './dragonball';

describe('Dragonball', () => {
  let service: DragonBallService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DragonBallService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
