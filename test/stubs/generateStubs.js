const compiler = require('../utils/compiler.js');
const fs = require('fs');

function write (name, output) {
    fs.writeFile(`test/stubs/outputs/${name}.txt`, output, () => {}); 
}

const options = {
    withClass: {
        customClass: 'icon'
    },

    withStyle: {
        withStyle: true,
    },

    withSlot: {
        slotName: 'iconSlot',
    },

    withStyleAndClass: {
        withStyle: true,
        customClass: 'icon'
    },

    withoutOptions: {},

    withAll: {
        withStyle: true,
        customClass: 'icon',
        slotName: 'iconSlot',
    }
}

Object.keys(options).forEach(async (key) => {
    const stats = await compiler('icon-3.svg', options[key]);
    const output = stats.toJson().modules[0].source;
    write(key, output);
});
