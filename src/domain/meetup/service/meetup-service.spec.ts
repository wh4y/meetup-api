import { MeetupService } from './meetup.service';
import { CreateMeetupOptions } from '../entity/options/create-meetup.options';

describe('MeetupService', () => {

  let meetupService: MeetupService;

  beforeEach(() => {
    meetupService = new MeetupService();
  });

  describe('create', () => {

    beforeEach(() => {
      jest.spyOn(meetupService, 'createOne');
    });

    it('should return meetup', async () => {
      const options: CreateMeetupOptions = {
        title: 'meeting',
        description: 'nothing',
        datetime: new Date(),
        tags: ['none', 'nothing'],
      };

      const meetup = await meetupService.createOne(options);

      expect(meetupService.createOne).toBeCalledTimes(1);

      expect(meetup).toBeDefined();

      expect(meetup.id).toBe(undefined);
      expect(meetup.title).toEqual(options.title);
      expect(meetup.description).toEqual(options.description);
      expect(meetup.datetime).toEqual(options.datetime);
      expect(meetup.tags).toEqual(options.tags);
    });
  });
});
