interface CreateMeetupOptions {
  title: string;
  description: string;
  datetime: Date;
  tags: string [];
}

export class Meetup {
  public readonly id: number;
  public readonly title: string;
  public readonly description: string;
  public readonly datetime: Date;
  public readonly tags: string[];

  private constructor(options: CreateMeetupOptions) {
    this.title = options.title;
    this.description = options.description;
    this.datetime = options.datetime;
    this.tags = options.tags;
  }

  public static create(options: CreateMeetupOptions): Meetup {
    return new Meetup(options);
  }

  public withTitle(title: string): Meetup {
    return Meetup.create({ ...this, title });
  }

  public withDescription(description: string): Meetup {
    return Meetup.create({ ...this, description });
  }

  public withDatetime(datetime: Date): Meetup {
    return Meetup.create({ ...this, datetime });
  }

  public withTags(tags: string[]): Meetup {
    return Meetup.create({ ...this, tags });
  }
}
