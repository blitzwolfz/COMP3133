import { InferSchemaType, Schema, model } from 'mongoose';

const addressSchema = new Schema(
  {
    building: { type: String, default: null },
    street: { type: String, default: null },
    zipcode: { type: String, default: null }
  },
  { _id: false }
);

const restaurantSchema = new Schema(
  {
    address: { type: addressSchema, required: true },
    city: { type: String, required: true },
    cuisine: { type: String, required: true },
    name: { type: String, required: true },
    restaurant_id: { type: String, required: true }
  },
  {
    versionKey: false,
    collection: 'Restaurants'
  }
);

export type Restaurant = InferSchemaType<typeof restaurantSchema>;

const RestaurantModel = model<Restaurant>('Restaurant', restaurantSchema);

export default RestaurantModel;
