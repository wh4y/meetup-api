import { UpdateMeetupOptions } from '../../../../domain/meetup/service/options/update-meetup.options';

export class EditMeetupDto implements UpdateMeetupOptions {
  public title?: string;
  public description?: string;
  public datetime?: Date;
  public address?: string;
  public tags?: string [];
}
