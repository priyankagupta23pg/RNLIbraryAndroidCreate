package com.reactproj.internal;

import android.Manifest;
import android.app.Activity;
import android.content.Intent;

import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.BaseJavaModule;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.modules.core.PermissionAwareActivity;
import com.facebook.react.modules.core.PermissionListener;

import javax.annotation.Nonnull;

/**
 * Expose a simple {@code DemoLibrary.getName(} method to JavaScript.
 */
class DemoLibraryNativeModule extends ReactContextBaseJavaModule implements ActivityEventListener, PermissionListener {
    Promise promise;
    /**
     * @return the name of this module as seen by JavaScript.
     */
    @Override
    public String getName() {
        return "React Native Demo Library";
    }

    @ReactMethod
    void getName(@Nonnull Promise promise) {
        promise.resolve("React Native Demo Library");
    }
    @Override
    public void onActivityResult(Activity activity,int requestCode, int resultCode, Intent data) {
        this.promise.resolve(data.getDataString());
    }



    @Override
    public void onNewIntent(Intent intent) {

    }

    @Override
    public boolean onRequestPermissionsResult(int requestCode, String[] permissions, int[] grantResults) {
        return true;
    }


}
