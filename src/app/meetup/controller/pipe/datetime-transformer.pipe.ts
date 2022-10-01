import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { CreateMeetupOptions } from '../../../../domain/meetup/entity/options/create-meetup.options';

interface IncomingCreateMeetupData extends Omit<Partial<CreateMeetupOptions>, 'datetime'> {
  datetime?: string;
}

@Injectable()
export class DatetimeTransformerPipe<R> implements PipeTransform<IncomingCreateMeetupData, R> {
  transform(value: IncomingCreateMeetupData, metadata: ArgumentMetadata): R {
    if (!value.datetime) return value as R;
    const datetime = new Date(value.datetime);

    const dto = { ...value, datetime };

    return dto as R;
  }
}
