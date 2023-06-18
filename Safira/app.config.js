module.exports = {
    "name": "Safira",
    "slug": "Safira",
    "privacy": "public",
    "runtimeVersion": {
        "policy": "sdkVersion"
    },
    "version": "1.0.14",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "automatic",
    "splash": {
        "image": "./assets/splash.png",
        "resizeMode": "contain",
        "backgroundColor": "#152d44"
    },
    "androidNavigationBar": {
        "backgroundColor": "#152d44"
    },
    "assetBundlePatterns": [
        "**/*"
    ],
    "android": {
        "package": "br.com.cms.app.safira",
        "icon": "./assets/icon.png",
        "versionCode": 14,
        "permissions": [
            "INTERNET",
            "ACCESS_FINE_LOCATION",
            "READ_EXTERNAL_STORAGE",
            "ACCESS_COARSE_LOCATION",
            "ACCESS_NETWORK_STATE",
            "com.htc.launcher.permission.READ_SETTINGS",
            "MANAGE_DOCUMENTS",
            "android.permission.ACCESS_FINE_LOCATION",
            "com.sonyericsson.home.permission.BROADCAST_BADGE",
            "WRITE_EXTERNAL_STORAGE",
            "android.permission.ACCESS_NETWORK_STATE",
            "android.permission.INTERNET",
            "android.permission.READ_EXTERNAL_STORAGE",
            "android.permission.WRITE_EXTERNAL_STORAGE",
            "android.permission.READ_INTERNAL_STORAGE",
            "android.permission.WRITE_INTERNAL_STORAGE",
            "android.permission.MANAGED_DOCUMENTS",
            "android.permission.CHANGE_CONFIGURATION",
            "com.google.android.c2dm.permission.RECEIVE",
            "com.android.launcher.permission.INSTALL_SHORTCUT",
            "com.htc.launcher.permission.UPDATE_SHORTCUT",
            "com.anddoes.launcher.permission.UPDATE_COUNT",
            "com.google.android.gms.permission.ACTIVITY_RECOGNITION",
            "com.google.android.providers.gsf.permission.READ_GSERVICES",
            "com.majeur.launcher.permission.UPDATE_BADGE",
            "com.sec.android.provider.badge.permission.READ",
            "com.sec.android.provider.badge.permission.WRITE"
        ],
        "adaptiveIcon": {
            "foregroundImage": "./assets/adaptive-icon.png",
            "backgroundColor": "#152d44"
        }
    },
    "extra": {
        "eas": {
            "projectId": "c055cbbc-00dd-4fa1-82d3-f8ea0fd86bbe"
        }
    },
    "updates": {
        "fallbackToCacheTimeout": 0,
        "url": "https://u.expo.dev/c055cbbc-00dd-4fa1-82d3-f8ea0fd86bbe"
    },
    "ios": {}
};
