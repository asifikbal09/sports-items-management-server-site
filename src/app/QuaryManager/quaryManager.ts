import { Query } from 'mongoose';
import AppError from '../error/appError';


class QueryManager<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  pagination() {
    const page = Number(this.query.page) || 1;
    const limit = Number(this.query.limit) || 10;
    const skip = (page - 1) * limit;

    this.modelQuery = this.modelQuery.skip(skip).limit(limit);
    return this;
  }
  

  search(searchableFields: string[]) {
    if( this.query.searchTerm ){
        this.modelQuery = this.modelQuery.find({
          $or: searchableFields.map((field) => ({
            [field]: {
              $regex: this.query.searchTerm,
              $options: 'i',
            },
          })),
        });
        return this;
    }
  }

  sortBy() {
    const sort = this?.query?.sortBy || '-createdAt';
    const sortInOrder = this.query.sortOrder || 'asc';

    const sortByFields = [
      'title',
      'price',
      'startDate',
      'endDate',
      'language',
      'durationInWeeks',
      '-createdAt',
    ];

    if (!sortByFields.includes(sort as string)) {
      throw new AppError(500, 'Please put a valid string.');
    }

    if (sortInOrder === 'asc') {
      this.modelQuery = this?.modelQuery?.sort(sort as string);
    }

    if (sortInOrder === 'desc') {
      this.modelQuery = this?.modelQuery?.sort(('-' + sort) as string);
    }

    return this;
  }

}

export default QueryManager;