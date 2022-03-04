import { db } from "./db.server";

export const getOrCreateAppSettings = async () => {
  let appSettings = await db.appSettings.findFirst();
  if (!appSettings) {
    appSettings = await db.appSettings.create({
      data: {
        configured: false,
      },
    });
  }
  return appSettings;
};

export const updateAppSettings = async (data: { configured: boolean }) => {
  let appSettings = await db.appSettings.findFirst();
  if (appSettings) {
    return await db.appSettings.update({
      data: data,
      where: {
        id: appSettings.id,
      },
    });
  }
  return appSettings;
};
