---
title: "Unroll the Rollup banner !"
authors: Mark Moissette
tags:
- rollup
- javascript
- es6
- bundling
- tips
date: "2017-04-02"
---

# Unroll the Rollup banner !

Recently when creating multiple bundles for [OpenJSCAD](https://github.com/Spiritdude/OpenJSCAD.org) using [rollup](https://github.com/rollup/rollup)  we needed to add a shebang to the output command line bundle to enable running it as a script.

We went through multiple iterations before finding, "lo and behold!" a setting in rollup itself.



## Solution:

You can specify a **```banner```** option : it is a string that will appear at the very top of your output bundle: very handy for creating cli tools!

 ```javascript
 {
   banner: '#!/usr/bin/env node\n',
   //other settings here
 }
 ```

## Other (not so great) solution: using the [rollup-plugin-post-replace](foo) plugin:

you need to add a **replace** entry to the plugins list :

This relies on the fact that `use strict` is added to the top of the bundles (when transpiling es6)

```javascript
{
  plugins: [
    replace({
      "'use strict';": "#!/usr/bin/env node\n'use strict';"
    })
   ]
}
```

the problem with this , is that it utterly fails if you have more than one `use strict` entries ...
