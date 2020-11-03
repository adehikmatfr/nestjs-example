import { getModelForClass } from '@typegoose/typegoose';
import { Mongoose } from 'mongoose';
import { isNullOrUndefined } from 'util';

export class MongooseGenericRepositoryService<T> {
  public get model() {
    return getModelForClass(this.targetModelClass, {
      existingMongoose: this.mongoose,
    });
  }

  constructor(
    public targetModelClass: new (...args: any) => T,
    public mongoose: Mongoose,
  ) {
    this.mongoose.models[targetModelClass.name] = this.model;
  }

  /**
   * Creates a new document, saves and returns it, based on the given object.
   *
   * @param {Object} [input={}] The object that should be saved
   * @returns {Object} Created document
   */
  async create(input: Partial<T> = {}) {
    const ObjectId = require('mongoose').Types.ObjectId;

    const doc = new this.model(input);
    doc._id = new ObjectId();

    const res = await doc.save();
    return doc;
  }

  /**
   * Searches for (a) Document(s) based on the given Query
   *
   * @param {Object} query Query to execute in MongoDB
   * @param {String} select Fields to include
   * @param {String} populate Fields to populate
   * @param {Number} limit Max amount of docs
   * @param {Number} skip The amount of documents the query should skip
   * @param {Object} sort Fields to sort by
   * @param {Boolean} lean True if the result should be lean, false if not
   * @returns {Object} Search result
   */
  find(
    query: any = {},
    {
      select,
      populate,
      limit,
      skip,
      sort,
    }: {
      select?: Object;
      populate?: (string | Object)[];
      limit?: number;
      skip?: number;
      sort?: Object;
    } = {},
  ) {
    const result = this.model.find(query);

    if (select) {
      result.select(select);
    }
    if (limit) {
      result.limit(limit);
    }
    if (skip) {
      result.skip(skip);
    }

    if (populate) {
      this.populateQuery(result, populate);
    }

    if (sort) {
      result.sort(sort);
    }

    return result;
  }

  /**
   * Searches for (a) Document(s) based on the given Query
   *
   * @param {Object} query Query to execute in MongoDB
   * @param {String} select Fields to include
   * @param {String} populate Fields to populate
   * @param {Number} limit Max amount of docs
   * @param {Number} skip The amount of documents the query should skip
   * @param {Object} sort Fields to sort by
   * @param {Boolean} lean True if the result should be lean, false if not
   * @returns {Object} Search result
   */
  findOne(
    query: any = {},
    {
      select,
      populate,
      limit,
      skip,
      sort,
    }: {
      select?: any;
      populate?: (string | Object)[];
      limit?: number;
      skip?: number;
      sort?: Object;
    } = {},
  ) {
    const result = this.model.findOne(query);

    if (select) {
      result.select(select);
    }
    if (limit) {
      result.limit(limit);
    }
    if (skip) {
      result.skip(skip);
    }

    if (populate) {
      this.populateQuery(result, populate);
    }

    if (sort) {
      result.sort(sort);
    }

    return result;
  }

  /**
   * Searches for one Document based on the ObjectID
   * Second parameter is an Options object
   *
   * @param {String} objectId An uploads ObjectId
   * @param {String} select Fields to include
   * @param {String} populate Fields to populate
   * @param {Boolean} lean True if the result should be lean, false if not
   * @returns {Object} document || error The Object with the correct upload or error property with what went wrong
   */
  findByObjectId(
    objectId,
    {
      select,
      populate,
    }: {
      select?: Object;
      populate?: (string | Object)[];
    } = {},
  ) {
    return this.findOne({ _id: objectId }, { select, populate });
  }

  findAll() {
    return this.find({});
  }

  /**
   * Finds a Document by its ID, adds the new/updated values and saves it
   * This is done entirely in the Node.js app, not in the database
   *
   * @param {String} objectId The ID of the Document you'd like to update
   * @param {Object} newValues The new/updated values for the Document
   * @returns {Object} doc
   */
  async update(objectId, newValues) {
    const result = await this.findByObjectId(objectId);

    Object.assign(result, newValues);

    await result.save();

    return result;
  }

  /**
   * Removes a document based on the given ObjectID
   *
   * @param {String} objectId The ID of the Document you'd like to delete
   * @returns {Object} result || error
   */
  async remove(objectId) {
    return this.model.remove({ _id: objectId });
  }

  private populateQuery(query, populate) {
    if (populate.constructor === String || populate.constructor === Object) {
      query.populate(populate);
    } else if (populate.constructor === Array) {
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < populate.length; i++) {
        query.populate(populate[i]);
      }
    }
  }
}
