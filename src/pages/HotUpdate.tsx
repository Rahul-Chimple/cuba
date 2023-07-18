import { IonPage } from "@ionic/react";
import { FC, useEffect } from "react";
import { AppUpdater } from "../services/AppUpdater.ts";
import { useHistory } from "react-router";
import { PAGES } from "../common/constants";
import { t } from "i18next";
import "./HotUpdate.css";
import Loading from "../components/Loading";
import { REMOTE_CONFIG_KEYS, RemoteConfig } from "../services/RemoteConfig";

const HotUpdate: FC<{}> = () => {
  const history = useHistory();
  const init = async () => {
    try {
      const canHotUpdate = await RemoteConfig.getBoolean(
        REMOTE_CONFIG_KEYS.CAN_HOT_UPDATE
      );
      console.log(
        "🚀 ~ file: HotUpdate.tsx:18 ~ init ~ canHotUpdate:",
        canHotUpdate
      );
      if (!canHotUpdate) {
        push();
        return;
      }
      const hotUpdateServer = await RemoteConfig.getString(
        REMOTE_CONFIG_KEYS.HOT_UPDATE_SERVER
      );
      console.log(
        "🚀 ~ file: AppUpdate.tsx:18 ~ init ~ hotUpdateServer:",
        hotUpdateServer
      );
      const appUpdate = await AppUpdater.sync(hotUpdateServer);
      console.log("🚀 ~ file: AppUpdate.tsx:19 ~ init ~ appUpdate:", appUpdate);
      push();
    } catch (error) {
      console.log("🚀 ~ file: AppUpdate.tsx:21 ~ init ~ error:", error);
      push();
    }
  };
  const push = () => {
    history.replace(PAGES.HOME);
  };
  useEffect(() => {
    init();
  }, []);
  return (
    <IonPage id="app-update">
      <Loading isLoading={true} msg={t("Checking for Update").toString()} />
    </IonPage>
  );
};
export default HotUpdate;
