const compiler = require('../utils/compiler.js');
const fs = require('fs');

const options = {
    withClass: {
        customClass: 'icon'
    },

    withSlot: {
        slotName: 'iconSlot',
    },

    withoutOptions: {},

    withAll: {
        customClass: 'icon',
        slotName: 'iconSlot'
    }
}

Object.keys(options).forEach(async (key) => {
    console.log(`Creating stub ${key}`);
    const stats = await compiler('icon-3.svg', options[key]);
    const output = stats.toJson().modules[0].source;
    fs.writeFile(`test/stubs/outputs/${key}.txt`, output, () => {}); 
});
