package com.example.sampleapplication;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.content.Intent;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.provider.Settings;
import android.util.Log;
import android.view.View;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

import com.facebook.react.modules.core.PermissionAwareActivity;
import com.facebook.react.modules.core.PermissionListener;
import com.reactproj.ReactNativeDemoLibrary;

/**
 * Activity hosting React Native demo.
 */
public class ReactDemoActivity extends AppCompatActivity implements PermissionAwareActivity{

    private PermissionListener mPermissionListener;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        getSupportActionBar().hide();

        openReactView();
    }

    @SuppressLint("NewApi")
    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        ReactNativeDemoLibrary.getReactInstanceManager().onActivityResult(this,requestCode, resultCode, data);

//        if (requestCode == OVERLAY_PERMISSION_REQ_CODE) {
//            if (!Settings.canDrawOverlays(this)) {
//                Toast.makeText(this, "Overlay permission denied", Toast.LENGTH_SHORT).show();
//                return;
//            }
//
//            openReactView();
//        }
//        else
//        {
//            Log.d("ANDROID","IMAGE PICKER RES"+data);
//
//           // Toast.makeText(this, "SOME THING called", Toast.LENGTH_SHORT).show();
//
//        }
    }
//@Override
//protected void onActivityResult(int requestCode, int resultCode, Intent data) {
//    super.onActivityResult(requestCode, resultCode, data);
//
//}
    private void openReactView() {
        View view = ReactNativeDemoLibrary.openReactView(this, true);
        setContentView(view);
    }

    @Override
    public void requestPermissions(String[] permissions, int requestCode, PermissionListener listener) {
        mPermissionListener=listener;
        super.requestPermissions(permissions,requestCode);
    }
    @Override
    public void onRequestPermissionsResult(
            int requestCode, String[] permissions, int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
        if (mPermissionListener != null
                && mPermissionListener.onRequestPermissionsResult(requestCode, permissions, grantResults)) {
            mPermissionListener = null;
        }
    }

//    @Override
//    public void requestPermissions(String[] permissions, int requestCode, PermissionListener listener) {
//super.requestPermissions(permissions,requestCode);
//    }

}
