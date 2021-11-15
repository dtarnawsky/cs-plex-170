# Older Android Device Crash
This creates the Android crash:
java.lang.IllegalStateException: You need to use a Theme.AppCompat theme (or descendant) with this activity.

The cause is `styles.xml` containing this:
```xml
    <style name="Transparent">
        <item name="android:windowIsTranslucent">true</item>
        <item name="android:windowAnimationStyle">@android:style/Animation.Translucent</item>
        <item name ="android:windowBackground">#00000000</item>
        <item name="android:windowNoTitle">true</item>
        <item name="android:colorForeground">#fff</item>
    </style>
```