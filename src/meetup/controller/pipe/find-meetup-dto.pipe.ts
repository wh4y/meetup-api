import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class FindMeetupDtoPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const dto = { ...value };
    Reflect.deleteProperty(dto, 'page');
    Reflect.deleteProperty(dto, 'count');

    return dto;
  }
}
