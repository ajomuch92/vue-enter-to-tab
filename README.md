# vue-enter-to-tab
A mixin to use the enter key as tab key behavior. You can see a demo [here](https://codesandbox.io/s/hardcore-ritchie-3g2my).

### Install  

NPM:  
```bash
npm i --save vue-enter-to-tab
```

### Usage instructions  

Install the mixin globally on your main file. It's **required** to install it as follows:

```javascript
import VueEnterToTab from 'vue-enter-to-tab';

Vue.use(VueEnterToTab, initialStatus);
```

Where *initialStatus* indicates if the mixin is enabled or not initially. By default, it's true.


### How to use it

After the installation, you can use the mixin on the component you need:

```javascript
import {EnterToTabMixin} from 'vue-enter-to-tab';
export default {
  ...
  mixins: [EnterToTabMixin],
  ...
}
```

### Other Utilities

|  Name | Description   | Type   |
| ------------ | ------------ | ------------ |
| $isEnterToTabEnabled  | Data to indicate if mixin is enable | Boolean   |
| $enabledEnterToTab  | Method to enable the mixin |  Method  |
| $disableEnterToTab  | Method to disable the mixin | Method   |
| $setEnterToTabStatus  | Method to set manually the mixin status. It receives as only paramater the status to set | Method   |
| $toggleEnterToTab  | Method to toggle the mixin status | Method   |
| v-prevent-enter-tab  | Directive to use in those inputs you want to avoid use enter as key | Directive   |

These utilities are available globally, on all Vue instance.

**Note**: This directive doesn't work on textarea elements.

Any contribution is welcome. Visit my web page [here](https://www.ajomuch92.site/#/).

### License
MIT

