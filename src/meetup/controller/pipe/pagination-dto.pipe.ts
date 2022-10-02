import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { MeetupPaginationDto } from '../dto/meetup-pagination.dto';

@Injectable()
export class PaginationDtoPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata): MeetupPaginationDto {
    return {
      page: value.page,
      count: value.count,
    };
  }
}
