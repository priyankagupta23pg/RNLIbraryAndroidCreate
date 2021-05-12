package com.reactproj;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.content.Context;
import android.view.View;

import androidx.annotation.NonNull;

import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactRootView;
import com.facebook.react.common.LifecycleState;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import com.reactproj.internal.ActivityLifeCycleHandler;
import com.reactproj.internal.DemoReactPackage;

import com.reactnative.ivpusic.imagepicker.PickerPackage;
/**
 * Public interface to React Native Demo Library.
 */
public final class ReactNativeDemoLibrary {

    /**
     * Make sure we don't change "useDeveloperSupport" during the app's lifetime; the results
     * will be unpredictable.
     */
    private enum DeveloperSupport {
        Uninitialized,
        UseDeveloperSupport,
        DontUseDeveloperSupport;

        static DeveloperSupport fromBoolean(boolean value) {
            return value ? UseDeveloperSupport : DontUseDeveloperSupport;
        }

        boolean equals(boolean value) {
            return value ? this == UseDeveloperSupport : this == DontUseDeveloperSupport;
        }
    }

    /**
     * Holds the singleton {@link ReactInstanceManager}.
     *
     * The "context leak" warning can be ignored; the {@link Context} in question is in fact the
     * application context -- the only one guaranteed to live for the lifetime of the application.
     * It cannot leak.
     *
     * https://nfrolov.wordpress.com/2014/07/12/android-using-context-statically-and-in-singletons/
     */
    @SuppressLint("StaticFieldLeak")
    public static ReactInstanceManager reactInstanceManager;

    private static DeveloperSupport developerSupport = DeveloperSupport.Uninitialized;

    /**
     * Prohibit instantiation of the {@link ReactNativeDemoLibrary} static class.
     */
    private ReactNativeDemoLibrary() {
        throw new IllegalStateException("Static class; do not instantiate.");
    }

    public static ReactInstanceManager getReactInstanceManager()
    {
        return reactInstanceManager;
    }
    public static View openReactView(@NonNull Activity activity, boolean useDeveloperSupport) {
        try {
            SoLoader.init(activity, false);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        //noinspection ConstantConditions
        if (activity == null) {
            throw new IllegalArgumentException("Null activity passed to ReactNativeDemoLibrary.start");
        }

        if (developerSupport == DeveloperSupport.Uninitialized) {
            assert reactInstanceManager == null;
            developerSupport = DeveloperSupport.fromBoolean(useDeveloperSupport);
        } else if (!developerSupport.equals(useDeveloperSupport)) {
            assert reactInstanceManager != null;
            throw new IllegalArgumentException("The value of useDeveloperSupport may not be changed during the app's lifetime.");
        }

        if (reactInstanceManager == null) {
            reactInstanceManager = ReactInstanceManager.builder()
                    .setApplication(activity.getApplication())
                    .setBundleAssetName("index.android.bundle")
                    .setJSMainModulePath("index")
                    .addPackage(new MainReactPackage())
                    .addPackage(new DemoReactPackage())
                   // .addPackage(new RNCWebViewPackage())
                    .setUseDeveloperSupport(useDeveloperSupport)
                    .addPackage(new PickerPackage())
                    .setInitialLifecycleState(LifecycleState.BEFORE_RESUME)
                    .build();
        }

        ActivityLifeCycleHandler lifeCycleHandler = new ActivityLifeCycleHandler(activity, reactInstanceManager);
        activity.getApplication().registerActivityLifecycleCallbacks(lifeCycleHandler);

        ReactRootView reactRootView = new ReactRootView(activity);
        reactRootView.startReactApplication(reactInstanceManager, "Appp");
        return reactRootView;
    }
}
