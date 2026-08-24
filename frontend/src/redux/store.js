import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./category/categorySlice";
import collectionReducer from "./collection/collectionSlice";
import productReducer from "./product";

import authReducer from "./auth/authSlice";
import settingReducer from "./setting";
import journalReducer from "./journal";
import bannerReducer from "./banner";
import sampleOrderReducer from "./sampleOrder";
import wholesaleReducer from "./wholesale";
import contactReducer from "./contact";
import websiteCollectionReducer from "./websiteCollection";
import websiteCategoryReducer from "./websiteCategory";
import websiteProductReducer from "./websiteProduct";
import dashboardReducer from "./dashboard";
import {adminReducer} from "./admin";
import quickOrderReducer from "./quickOrder";
import websiteQuickOrderReducer from "./websiteQuickOrder";
import websiteSampleOrderReducer from "./websiteSampleOrder";
import websiteBanner from "./websiteBanner";
import homeReducer from "./home";
import websiteSettingReducer from "./websiteSetting";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    category: categoryReducer,
    collection: collectionReducer,
    product: productReducer,
    setting: settingReducer,
    journal: journalReducer,
    banner: bannerReducer,
    sampleOrder: sampleOrderReducer,
    wholesale: wholesaleReducer,
    contact: contactReducer,
    websiteCollection: websiteCollectionReducer,
    websiteCategory: websiteCategoryReducer,
    websiteProduct: websiteProductReducer,
    admin: adminReducer,
    quickOrder: quickOrderReducer,
    websiteQuickOrder: websiteQuickOrderReducer,
    websiteSampleOrder: websiteSampleOrderReducer,
    websiteBanner: websiteBanner,
    dashboard: dashboardReducer,
    home: homeReducer,
    websiteSetting: websiteSettingReducer,
  },
});