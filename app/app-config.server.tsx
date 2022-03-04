import convict from "convict";
import {
  getOrCreateAppSettings,
  updateAppSettings,
} from "~/models/app-settings";

console.log("process.env.NODE_ENV", process.env.NODE_ENV);

const config = convict({
  appId: {
    doc: "The application environment.",
    format: function check(val) {
      if (
        !val ||
        val === "" ||
        val === "87gdh65fars65kj076hs7162hsabxlko7621"
      ) {
        throw new Error("Please set the APP_ID environement variable");
      }
    },
    default: "87gdh65fars65kj076hs7162hsabxlko7621",
    env: "APP_ID",
  },
});
config.loadFile("./config/" + process.env.NODE_ENV + ".json");
config.validate();

export const appSettings = async () => {
  const appConfigured = (await getOrCreateAppSettings()).configured;
  return {
    appConfigured: appConfigured,
    appId: config.get("appId"),
  };
};

export const setAppConfigured = async () => {
  return updateAppSettings({ configured: true });
};
