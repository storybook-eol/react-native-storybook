# Setup Storybook for Android

Replacing the main index.android.js is good enough for quickly checking it out. But for long term use, it is recommended to setup the storybook as a separate app. After completing these steps:

* The storybook can be started without changing your app javascript files.
* Both the app and storybook can be installed on your device at the same time.

These steps are made for the [ReactNativeButton](https://github.com/kadira-samples/react-native-button) project.

## Step 1: register a new build type

Open `android/app/build.gradle` in your text editor and locate the `buildTypes` block within the `android` block. Add a new build type named `storybook`.

```diff
  buildTypes {
      release {
          minifyEnabled enableProguardInReleaseBuilds
          proguardFiles getDefaultProguardFile("proguard-android.txt"), "proguard-rules.pro"
      }
+     storybook {
+         initWith(buildTypes.debug)
+         applicationIdSuffix "storybook"
+     }
  }
```
This introduces a new build type named `storybook`. It will create an app with application id, ""com.reactnativebutton.storybook"". Having different application ids allows both the regular app and the storybook app to stay in the same device/emulator.

## Step 2: override `getJSMainModuleName`

Open `android/app/src/main/java/[...]/MainActivity.java` and add following method to `MainActivity` class.

```java
  /**
   * Returns the name of the main module. Determines the URL used to fetch the JS bundle
   * from the packager server. It is only used when dev support is enabled.
   */
  @Override
  protected String getJSMainModuleName() {
    if (BuildConfig.BUILD_TYPE.equals("storybook")) {
      return "storybook/index.android";
    } else {
      return "index.android";
    }
  }
```

This checks if we are building the app using the `storybook` type we just registered, and if so, uses the bundle created from the entry file at `storybook/index.android.js` instead of the usual `index.android.js` at root.

## Step 3: Add npm script to start

Add a new npm script to quickly launch the storybook. Set the correct application id which you set above in the `build.gradle` file. Which is "storybook" suffixed to your usual application id.

```
{
  "storybook-android": "storybook run-android -i com.reactnativebutton.storybook"
}
```

Make sure you have connected the device/emulator by following [Connecting Devices](https://github.com/kadirahq/react-native-storybook#connecting-devices).

To run the storybook, run these 3 commands on separate terminal windows
```
npm run start
npm run storybook
npm run storybook-android
```
And open http://localhost:9001 on a web browser.

## Bundling JS into the storybook app

From above steps you can get a storybook development environment set up. In the development set up the javascript sources are not bundled into the app itself. They are fetched from the packager server running on your computer, allowing you to bring latest changes into the app by reloading JS.

Its possible that you want the JS to be bundled into the storybook app, so you can use it without having the packager server running. You can get this done by adding few configurations to the `android/app/build.gradle` file.

```diff
+if (System.getenv('STORYBOOK_BUNDLE')){
+  project.ext.react = [
+    entryFile: "storybook/index.android.js",
+    bundleInStorybook: true
+  ]
+}

apply from: "../../node_modules/react-native/react.gradle"
```

Its important that these are added before `apply from: "../../node_modules/react-native/react.gradle"`.

Now when you start the storybook app with `npm run storybook-android` if you have an environment variable `STORYBOOK_BUNDLE` available the JS will be bundled into the app. If you want this run,

`STORYBOOK_BUNDLE=1 npm run storybook-android`
