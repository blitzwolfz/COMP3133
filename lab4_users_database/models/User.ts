import { InferSchemaType, Schema, model } from 'mongoose';

const geoSchema = new Schema(
  {
    lat: { type: String, required: true },
    lng: { type: String, required: true }
  },
  { _id: false }
);

const addressSchema = new Schema(
  {
    street: { type: String, required: true },
    suite: { type: String, required: true },
    city: {
      type: String,
      required: true,
      validate: {
        validator: (v: string) => /^[a-zA-Z\s]+$/.test(v),
        message: 'City must contain only alphabets and spaces'
      }
    },
    zipcode: {
      type: String,
      required: true,
      validate: {
        validator: (v: string) => /^\d{5}-\d{4}$/.test(v),
        message: 'Zipcode must be in format DDDDD-DDDD (e.g. 12345-1234)'
      }
    },
    geo: { type: geoSchema, required: true }
  },
  { _id: false }
);

const companySchema = new Schema(
  {
    name: { type: String, required: true },
    catchPhrase: { type: String, required: true },
    bs: { type: String, required: true }
  },
  { _id: false }
);

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    username: {
      type: String,
      required: true,
      minlength: [4, 'Username must be at least 4 characters'],
      maxlength: [100, 'Username must be at most 100 characters']
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
        message: 'Please enter a valid email address'
      }
    },
    address: { type: addressSchema, required: true },
    phone: {
      type: String,
      required: true,
      validate: {
        validator: (v: string) => /^\d-\d{3}-\d{3}-\d{4}$/.test(v),
        message: 'Phone must be in format D-DDD-DDD-DDDD (e.g. 1-123-123-1234)'
      }
    },
    website: {
      type: String,
      required: true,
      validate: {
        validator: (v: string) => /^https?:\/\/.+/.test(v),
        message: 'Website must be a valid URL starting with http or https'
      }
    },
    company: { type: companySchema, required: true }
  },
  {
    versionKey: false,
    collection: 'users'
  }
);

export type User = InferSchemaType<typeof userSchema>;

const UserModel = model<User>('User', userSchema);

export default UserModel;
