export const Enter2TabMixin = {
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
          && this.$isEnter2TabEnabled 
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
    vue.prototype.$isEnter2TabEnabled = initialValue||false;
    vue.prototype.$disableEnter2Tab = () => {
      vue.prototype.$isEnter2TabEnabled = false;
    };
    vue.prototype.$enabledEnter2Tab = () => {
      vue.prototype.$isEnter2TabEnabled = true;
    };
    vue.prototype.$setEnter2TabStatus = (value) => {
      vue.prototype.$isEnter2TabEnabled = value;
    };
    vue.prototype.$toggleEnter2Tab = () => {
      vue.prototype.$isEnter2TabEnabled = !vue.prototype.$isEnter2TabEnabled;
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