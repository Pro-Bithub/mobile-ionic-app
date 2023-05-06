# pfe-mobile
ionic serve --port=8100 --address=0.0.0.0

ionic capacitor add android

ionic build --prod
npx cap copy
npx cap open android
In Android Studio, click on the Build menu and select Generate Signed Bundle / APK
