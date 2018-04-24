import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import moment from 'moment';
import SimpleSchema from 'simpl-schema';

export const Reviews = new Mongo.Collection('reviews');

if (Meteor.isServer) {
  Meteor.publish('reviews', function () {
    return Reviews.find({});
  });
}

Meteor.methods({
  'reviews.insert'() {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    return Reviews.insert({
      title: '',
      body: '',
      rating: 0,
      userId: this.userId,
      writtenBy: Meteor.user().emails[0].address,
      updatedAt: moment().valueOf()
    });
  },
  'reviews.remove'(_id) {
    if(!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    try {
      new SimpleSchema({
        _id: {
          type: String,
          min: 1
        }
      }).validate({ _id});
    } catch (e) {
      throw new Meteor.Error(400, e.message);
    }

    Reviews.remove({ _id, userId: this.userId });
  },
  'reviews.update'(_id, updates) {
    if(!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    try {
      new SimpleSchema({
        _id: {
          type: String,
          min: 1
        },
        title: {
          type: String,
          optional: true
        },
        // having trouble setting rating as a number
        rating: {
          type: String,
          optional: true
        },
        body: {
          type: String,
          optional: true
        }
      }).validate({
        _id,
        ...updates
      });
    } catch (e) {
      throw new Meteor.Error(400, e.message);
    }

    Reviews.update({
      _id,
      userId: this.userId
    }, {
      $set: {
        updatedAt: moment().valueOf(),
        ...updates
      }
    });
  }
});