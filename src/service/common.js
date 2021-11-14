import Taro from "@tarojs/taro";
import { userStore } from "@/store/context";
import { BASE_URL } from "../constants";

export default {
  getUser() {
    return Taro.request({
      url: `${BASE_URL}/api/zdl/ware/delivery/was`,
      data: {
        openid: userStore.openid,
      },
    });
  },
};
