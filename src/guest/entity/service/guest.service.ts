import { IGuestService } from './interface/guest-service.interface';
import { Injectable, NotImplementedException } from '@nestjs/common';
import { CreateGuestOptions } from '../options/create-guest.options';
import { Guest } from '../guest.entity';

@Injectable()
export class GuestService implements IGuestService {
  create(options: CreateGuestOptions): Promise<Guest> {
    throw new NotImplementedException();
  }

  delete(id: number): Promise<Guest> {
    throw new NotImplementedException();
  }

  findById(id: number): Promise<Guest> {
    throw new NotImplementedException();
  }

  findMany(options: any): Promise<Guest[]> {
    throw new NotImplementedException();
  }

  update(options: any): Promise<Guest> {
    throw new NotImplementedException();
  }
}
