export const Utils = {
    appKey: "APP_KEY",
    setAppObj: (val) => {
        window.localStorage.setItem(Utils.appKey, JSON.stringify(val));
    },
    getAppObj: () => {
        let appObj = { token: '', orgName: '', artifacts: {} };
        return { ...appObj, ...JSON.parse(window.localStorage.getItem(Utils.appKey)) };
    }
}