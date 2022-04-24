const ENTER_CODE = 13;

export const EnterToTabMixin = {
  mounted() {
    this.$el.addEventListener('keydown', this.$keyDownEventHandler);
  },
  beforeDestroy() {
    this.$el.removeEventListener('keydown', this.$keyDownEventHandler);
  },
  methods: {
    $keyDownEventHandler(e) {
      const {target, ctrlKey, keyCode} = e;
      if(keyCode === ENTER_CODE 
          && !ctrlKey 
          && target 
          && target.tagName.toLowerCase() != 'textarea' 
          && this.$isEnterToTabEnabled 
          && !target.preventEnterTab) {
        e.preventDefault();
        const allElementsQuery = this.$el.querySelectorAll('input, button, a, textarea, select, audio, video, [contenteditable]');
        const allElements = [...allElementsQuery].filter(r => !r.disabled && !r.hidden && r.offsetParent && !r.readOnly);
        const currentIndex = [...allElements].indexOf(target);
        const targetIndex = (currentIndex + 1) % allElements.length;
        allElements[targetIndex].focus();
      }
    },
  }
};

export default {
  install(vue, initialValue) {
    vue.prototype.$isEnterToTabEnabled = initialValue||true;
    vue.prototype.$disableEnterToTab = () => {
      vue.prototype.$isEnterToTabEnabled = false;
    };
    vue.prototype.$enabledEnterToTab = () => {
      vue.prototype.$isEnterToTabEnabled = true;
    };
    vue.prototype.$disableEnterToTab = () => {
      vue.prototype.$isEnterToTabEnabled = false;
    };
    vue.prototype.$setEnterToTabStatus = (value) => {
      vue.prototype.$isEnterToTabEnabled = value;
    };
    vue.prototype.$toggleEnterToTab = () => {
      vue.prototype.$isEnterToTabEnabled = !vue.prototype.$isEnterToTabEnabled;
    };
    vue.directive('prevent-enter-tab', {
      bind: (el) => {
        el.preventEnterTab = true;
      },
      unbind: (el) => {
        delete el.preventEnterTab;
      }
    });
  }
};