// Export all models from this directory
// This simplifies imports throughout the application

const User = require('./User');
const Analytics = require('./Analytics');
const FormSubmission = require('./FormSubmission');
const Testimonial = require('./Testimonial');
const Project = require('./Project');
const News = require('./News');
const Config = require('./Config');
const ContactInfo = require('./ContactInfo');
const Service = require('./Service');

module.exports = {
  User,
  Analytics,
  FormSubmission,
  Testimonial,
  Project,
  News,
  Config,
  ContactInfo,
  Service
};
