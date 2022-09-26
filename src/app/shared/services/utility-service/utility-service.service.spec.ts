import { TestBed } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { UtilityServiceService } from './utility-service.service';

describe('UtilityServiceService', () => {
  let service: UtilityServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatSnackBarModule]
    });
    service = TestBed.inject(UtilityServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
