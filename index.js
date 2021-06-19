export const EnterToTabMixin = {
  mounted() {
    this.$el.addEventListener('keydown', this.$keyDownEventHandler);
  },
  beforeDestroy() {
    this.$el.removeEventListener('keydown', this.$keyDownEventHandler);
  },
  methods: {
    $keyDownEventHandler(e) {
      const {target, ctrlKey, code} = e;
      if(code === 'Enter' 
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
    vue.prototype.$disableEnter2Tab = () => {
      vue.prototype.$isEnterToTabEnabled = false;
    };
    vue.prototype.$enabledEnter2Tab = () => {
      vue.prototype.$isEnterToTabEnabled = true;
    };
    vue.prototype.$disableEnter2Tab = () => {
      vue.prototype.$isEnterToTabEnabled = false;
    };
    vue.prototype.$setEnter2TabStatus = (value) => {
      vue.prototype.$isEnterToTabEnabled = value;
    };
    vue.prototype.$toggleEnter2Tab = () => {
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