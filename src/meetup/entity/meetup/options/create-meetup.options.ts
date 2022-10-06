import { User } from '../../../module/auth/module/user/entity/user.entity';

export interface CreateMeetupOptions {
  title: string;
  description: string;
  datetime: Date;
  address: string;
  tags: string [];
  guests?: User[];
}
