const { AuthenticationError } = require('apollo-server-express');
const { User, Prescription } = require('../models');
const { signToken } = require('../utils/auth');
const axios = require('axios');

const resolvers = {
  Query: {
    scriptSearch: async (_, { name }) => {
      res = await axios.get(`https://rxnav.nlm.nih.gov/REST/drugs.json`, {
        params: {
          name
        }
      });
      let resultArray = [];
      res.data.drugGroup.conceptGroup?.forEach(group => {
        group.conceptProperties?.forEach(drug => resultArray.push(drug))
      });
      return resultArray;
    },
    user: async (_, { _id }) => {
      return await User.find(_id ? { _id } : {}).populate('prescriptions')
    },
    me: async (_, __, { user }) => {
      if (user) {
        return User.findById(user).populate('prescriptions');
      }
      throw new AuthenticationError('Not logged in');
    }
  },
  Mutation: {
    addUser: async (_, params) => {
      const user = await User.create(params);
      return { user, token: signToken(user) };
    },
    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      return { user, token: signToken(user) };
    },
    addPrescription: async (_, params, context) => {
      if (context.user) {
        const prescription = await Prescription.create(params);
        const user = await User.findByIdAndUpdate(context.user, {
          $push: { prescriptions: prescription._id }
        }, { new: true }).populate('prescriptions');
        return user;
      }
      throw new AuthenticationError('Not logged in');
    },
    updatePrescription: async (_, { _id, perDay }, context) => {
      if (context.user) {
        return await Prescription.findByIdAndUpdate(_id, { perDay }, { new: true });
      }
      throw new AuthenticationError('Not logged in');
    },
    deletePrescription: async (_, { _id }, { user }) => {
      if (user) {
        return await Prescription.findByIdAndDelete(_id);
      }
      throw new AuthenticationError('Not logged in');
    },
    nuke: async () => {
      await User.deleteMany();
      await Prescription.deleteMany();
      return {
        message: 'DB Wiped'
      }
    }
  }
}


// nameResponse = await fetch(`https://rxnav.nlm.nih.gov/REST/drugs.json?name=${name}`);

// imageResponse = await fetch(`https://rximage.nlm.nih.gov/api/rximage/1/rxnav?rxcui=${nameResponse.drugGroup.conceptGroup[1].conceptProperties[0].rxcui}`)


module.exports = resolvers;
