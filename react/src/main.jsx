import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { store } from "./store.js";
import { createTheme, ThemeProvider } from "@mui/material";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import rtlPlugin from "stylis-plugin-rtl";

export const backendUrl = "http://localhost:8000/api/";
export const fileUrl = "http://localhost:8000";

if (window.navigator.language === "ar") {
  document.dir = "rtl";
} else {
  document.dir = "ltr";
}

export const formatRelativeTime = (dateString) => {
  const now = new Date();
  const date = new Date(dateString);
  const diffInMs = now - date;
  const diffInSeconds = Math.floor(diffInMs / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);
  const diffInWeeks = Math.floor(diffInDays / 7);
  const diffInMonths = Math.floor(diffInDays / 30);
  const diffInYears = Math.floor(diffInDays / 365);

  if (diffInYears > 0) {
    if (document.dir === "rtl") {
      return `منذ ${diffInYears} سنة`;
    } else {
      return `${diffInYears} year${diffInYears > 1 ? "s" : ""} ago`;
    }
  } else if (diffInMonths > 0) {
    if (document.dir === "rtl") {
      return `منذ ${diffInMonths} شهر`;
    } else {
      return `${diffInMonths} month${diffInMonths > 1 ? "s" : ""} ago`;
    }
  } else if (diffInWeeks > 0) {
    if (document.dir === "rtl") {
      return `منذ ${diffInWeeks} أسبوع`;
    } else {
      return `${diffInWeeks} week${diffInWeeks > 1 ? "s" : ""} ago`;
    }
  } else if (diffInDays > 0) {
    if (document.dir === "rtl") {
      return `منذ ${diffInDays} يوم`;
    } else {
      return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`;
    }
  } else if (diffInHours > 0) {
    if (document.dir === "rtl") {
      return `منذ ${diffInHours} ساعة`;
    } else {
      return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;
    }
  } else if (diffInMinutes > 0) {
    if (document.dir === "rtl") {
      return `منذ ${diffInMinutes} دقيقة`;
    } else {
      return `${diffInMinutes} minute${diffInMinutes > 1 ? "s" : ""} ago`;
    }
  } else {
    if (document.dir === "rtl") {
      return "الآن";
    } else {
      return "Just now";
    }
  }
};

const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [rtlPlugin],
});

const theme = createTheme({
  direction: document.dir,
  typography: {
    fontFamily: "Rubik",
  },
  palette: {
    primary: {
      main: "#285BF6",
      light: window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "#FEFEFE"
        : "#525252",
      dark: window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "#525252"
        : "#FEFEFE",
    },
    secondary: {
      main: "#285BF6",
      light: "#FEFEFE",
      dark: "#525252",
    },
  },
});

const englishWords = [
  "username", // 0
  "at least 3 character", // 1
  "password", // 2
  "at least 8 character", // 3
  "login", // 4
  "don't have an account?", // 5
  "full name", // 6
  "confirm password", // 7
  "signup", // 8
  "already have an account?", // 9
  "settings", // 10
  "change", // 11
  "change profile image", // 12
  "change cover image", // 13
  "show likes", // 14
  "show shares", // 15
  "show followers", // 16
  "show following", // 17
  "add post", // 18
  "post", // 19
  "upload image", // 20
  "post description", // 21
  "add post", // 22
  "account settings", // 23
  "delete account", // 24
  "logout", // 25
  "No comments yet", // 26
  "Add a comment", // 27
  "delete account", // 28
  "are you sure you want to delete your account? if yes click delete, if no click cancel.", // 29
  "cancel", // 30
  "delete", // 31
  "are you sure you want to delete this post forever? if yes click delete, if no click cancel.", // 32
  "delete post", // 33
  "no posts", // 34
  "no likes yet", // 35
  "are you sure you want to logout? if yes click logout, if no click cancel.", // 36
  "for you", // 37
  "profile", // 38
  "following", // 39
  "comments", // 40
  "likes", // 41
  "shares", // 42
  "posts", // 43
  "followers", // 44
  "follow", // 45
  "un follow", // 46
  "no followers", // 47
  "no following", // 48
  "no likes yet", // 49
  "delete post", // 50
  "no shares yet", // 51
];
const arabicWords = [
  "اسم المستخدم", // 0
  "يجب على الأقل 3 حرف", // 1
  "كلمة المرور", // 2
  "يجب على الأقل 8 حرف", // 3
  "تسجيل الدخول", // 4
  "ليس لديك حساب؟", // 5
  "الاسم الكامل", // 6
  "تأكيد كلمة المرور", // 7
  "التسجيل", // 8
  "هل لديك حساب؟", // 9
  "الإعدادات", // 10
  "تغيير", // 11
  "تغيير صورة الملف الشخصي", // 12
  "تغيير صورة الغلاف", // 13
  "إظهار الإعجابات", // 14
  "إظهار المشاركات", // 15
  "إظهار المتابعين", // 16
  "إظهار المتابعين", // 17
  "إضافة منشور", // 18
  "نشر", // 19
  "تحميل الصورة", // 20
  "وصف المنشور", // 21
  "إضافة منشور", // 22
  "إعدادات الحساب", // 23
  "حذف الحساب", // 24
  "تسجيل الخروج", // 25
  "لا يوجد تعليقات بعد", // 26
  "إضافة تعليق", // 27
  "حذف الحساب", // 28
  "هل أنت متأكد من حذف حسابك؟ إذا كان نعم اضغط على حذف، إذا كان لا اضغط على إلغاء.", // 29
  "إلغاء", // 30
  "حذف", // 31
  "هل أنت متأكد من حذف هذا المنشور؟ إذا كان نعم اضغط على حذف، إذا كان لا اضغط على إلغاء.", // 32
  "حذف المنشور", // 33
  "لا يوجد منشورات", // 34
  "لا يوجد إعجابات", // 35
  "هل أنت متأكد من تسجيل الخروج؟ إذا كان نعم اضغط على تسجيل الخروج، إذا كان لا اضغط على إلغاء.", // 36
  "تصفح", // 37
  "صفحتك", // 38
  "المتابعين", // 39
  "تعليقات", // 40
  "إعجابات", // 41
  "مشاركات", // 42
  "المنشورات", // 43
  "المتابعين", // 44
  "متابعة", // 45
  "إلغاء المتابعة", // 46
  "لا يوجد متابعين", // 47
  "لا يوجد متابعين", // 48
  "لا يوجد إعجابات", // 49
  "حذف المنشور", // 50
  "لا يوجد مشاركات", // 51
];
export const translate = (word) => {
  const index = englishWords.indexOf(word);
  if (document.dir === "rtl") {
    return arabicWords[index];
  } else {
    return englishWords[index];
  }
};

if (document.dir === "rtl") {
  createRoot(document.getElementById("root")).render(
    <StrictMode>
      <Provider store={store}>
        <CacheProvider value={cacheRtl}>
          <ThemeProvider theme={theme}>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </ThemeProvider>
        </CacheProvider>
      </Provider>
    </StrictMode>
  );
} else {
  createRoot(document.getElementById("root")).render(
    <StrictMode>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ThemeProvider>
      </Provider>
    </StrictMode>
  );
}
