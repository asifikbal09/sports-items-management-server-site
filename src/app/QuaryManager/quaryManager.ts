import { Query } from "mongoose";
import AppError from "../error/appError";

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
    if (this.query.searchTerm) {
      this.modelQuery = this.modelQuery.find({
        $or: searchableFields.map((field) => ({
          [field]: {
            $regex: this.query.searchTerm,
            $options: "i",
          },
        })),
      });
    }
    return this;
  }

  sortBy() {
    const sort = this?.query?.sortBy || "-createdAt";
    const sortInOrder = this.query.sortOrder || "asc";

    const sortByFields = [
      "name",
      "price",
      "size",
      "brand",
      "stype",
      "material",
      "condition",
      "description",
      "-createdAt",
    ];

    if (!sortByFields.includes(sort as string)) {
      throw new AppError(500, "Please put a valid string.");
    }

    if (sortInOrder === "asc") {
      this.modelQuery = this?.modelQuery?.sort(sort as string);
    }

    if (sortInOrder === "desc") {
      this.modelQuery = this?.modelQuery?.sort(("-" + sort) as string);
    }

    return this;
  }

  filterByPrice() {
    const minPrice = Number(this.query.minPrice) || 0;
    const maxPrice = Number(this.query.maxPrice) || 1000;

    this.modelQuery = this.modelQuery.find({
      price: { $gte: minPrice, $lte: maxPrice },
    });
    return this;
  }

  filterBySize() {
    const size = this.query.size;
    if (size) {
      this.modelQuery = this.modelQuery.find({ size });
    }
    return this;
  }

  filterBySportsType() {
    const stype = this.query.sportType
    if (stype) {
      this.modelQuery = this.modelQuery.find({ stype });
    }
    return this;
  }

  filterByBrand() {
    const brand = this.query.brand;
    if (brand) {
      this.modelQuery = this.modelQuery.find({ brand });
    }
    return this;
  }

  filterByCondition() {
    const condition = this.query.condition;
    if (condition) {
      this.modelQuery = this.modelQuery.find({ condition });
    }
    return this;
  }

  filterByMaterial() {
    const material = this.query.material;
    if (material) {
      this.modelQuery = this.modelQuery.find({ material });
    }
    return this;
  } 

  filterByColor() {
    const color = this.query.color;
    if (color) {
      this.modelQuery = this.modelQuery.find({ color });
    }
    return this;
  }

  filterByWeekly() {
    const week = this.query.week;
    if (week) {
      const currentDate = new Date();
      const pastDate = new Date();
      pastDate.setDate(currentDate.getDate() - 7);

      this.modelQuery = this.modelQuery.find({
        createdAt: { $gte: pastDate, $lte: currentDate },
      });
    }
    return this;
  }

  filterByMonthly() {
    const month = this.query.month;
    if (month) {
      const currentDate = new Date();
      const pastDate = new Date();
      pastDate.setMonth(currentDate.getMonth() - 1);

      this.modelQuery = this.modelQuery.find({
        createdAt: { $gte: pastDate, $lte: currentDate },
      });
    }
    return this;
  }
  filterByYearly() {
    const year = this.query.year;
    if (year) {
      const currentDate = new Date();
      const pastDate = new Date();
      pastDate.setFullYear(currentDate.getFullYear() - 1);

      this.modelQuery = this.modelQuery.find({
        createdAt: { $gte: pastDate, $lte: currentDate },
      });
    }
    return this;
  }

  filterByDaily() {
    const day = this.query.day;
    if (day) {
      const currentDate = new Date();
      const pastDate = new Date();
      pastDate.setDate(currentDate.getDate() - 1);

      this.modelQuery = this.modelQuery.find({
        createdAt: { $gte: pastDate, $lte: currentDate },
      });
    }
    return this;
  }

}

export default QueryManager;
