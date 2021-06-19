# vue-reset-data
A mixin to reset your data to some point of time for VueJS components

### Install  

NPM:  
```bash
npm i --save vue-reset-data
```

### Usage instructions  

Install the mixin globally

```javascript
import Resetter from 'vue-reset-data';

Vue.use(Resetter);
```

Or import it as an individual mixin on your component

```javascript
import {ResetterMixin} from 'vue-reset-data';

export default {
  ...
  mixins: [ResetterMixin],
  ...
}
```

### How to use it

1. Call thefunction `initResetPlugin` to init the mixin at any point of the lifecycle of your component (Preferably on created or mounted):
```javascript
export default {
  created() {
    this.initResetPlugin()
  }
}
```
2. When you want to reset some, call the function `resetData`:
```javascript
export default {
  methods: {
    yourMethod() {
      this.resetData([keys]);
    }
  }
}
```
- keys: Arrays of strings containing the names of the data key you want to reset or a simple string with the name of the key to reset. If this value is null, will reset the whole data.

This mixin include a method named $clone to clone in deep objects. Use as follow:
```javascript
export default {
  methods: {
    yourMethod() {
      const clonedObject = this.$clone(objectToClone);
    }
  }
}
```

**NOTE:** Do not use the key `$originalData` as part of your data.

### License
MIT

