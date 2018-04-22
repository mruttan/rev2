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
      rating: '',
      userId: this.userId,
      writtenBy: Meteor.user().emails[0].address,
      updatedAt: moment().valueOf()
    });
  }
});