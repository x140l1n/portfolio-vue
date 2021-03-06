import Vue from "vue";
import App from "./App.vue";
import "./assets/css/base.css";
import "bootstrap";
import Moment from "vue-moment";
import moment from "moment";
import resize from "vue-resize-directive"
import AOS from "aos";
import "aos/dist/aos.css";

Vue.config.productionTip = false;
Vue.use(Moment);
moment.locale("es");

Vue.directive("resize", resize);

const observablePrograms = Vue.observable({ programs: [] })

Object.defineProperty(Vue.prototype, "$programs", {
  get () {
    return observablePrograms.programs;
  },
  set (value) {
    observablePrograms.programs = value;
  }
})

const observableProgramActive = Vue.observable({ programActive: null })

Object.defineProperty(Vue.prototype, "$programActive", {
  get () {
    return observableProgramActive.programActive;
  },
  set (value) {
    observableProgramActive.programActive = value;
  }
})

const observableThemeSelected = Vue.observable({ themeSelected: null })

Object.defineProperty(Vue.prototype, "$themeSelected", {
  get () {
    return observableThemeSelected.themeSelected;
  },
  set (value) {
    observableThemeSelected.themeSelected = value;
  }
})

const observableIsFullScreen = Vue.observable({ isFullScreen: false })

Object.defineProperty(Vue.prototype, "$isFullScreen", {
  get () {
    return observableIsFullScreen.isFullScreen;
  },
  set (value) {
    observableIsFullScreen.isFullScreen = value;
  }
})

const observableIsFullScreenFromToggle = Vue.observable({ isFullScreenFromToggle: true })

Object.defineProperty(Vue.prototype, "$isFullScreenFromToggle", {
  get () {
    return observableIsFullScreenFromToggle.isFullScreenFromToggle;
  },
  set (value) {
    observableIsFullScreenFromToggle.isFullScreenFromToggle = value;
  }
})

const observableUrlToOpen = Vue.observable({ urlToOpen: "" })

Object.defineProperty(Vue.prototype, "$urlToOpen", {
  get () {
    return observableUrlToOpen.urlToOpen;
  },
  set (value) {
    observableUrlToOpen.urlToOpen = value;
  }
})

const eventsFullScreen = ["fullscreenchange", "webkitfullscreenchange", "mozfullscreenchange", "msfullscreenchange"];

eventsFullScreen.forEach(
  eventType => document.addEventListener(eventType, () => {
    if (!(document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement)) {
      observableIsFullScreen.isFullScreen = false;
    } else {
      observableIsFullScreen.isFullScreen = true;
    }

    observableIsFullScreenFromToggle.isFullScreenFromToggle = false;
  }, false)
);

AOS.init();

new Vue({
  render: h => h(App),
}).$mount("#app");