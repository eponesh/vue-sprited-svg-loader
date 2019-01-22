const compiler = require('./utils/compiler.js');
const readFile = require('./utils/readFile.js');

const outputStubs = {
    withClass: require.resolve('./stubs/outputs/withClass.txt'),
    withStyle: require.resolve('./stubs/outputs/withStyle.txt'),
    withStyleAndClass: require.resolve('./stubs/outputs/withStyleAndClass.txt'),
    withoutOptions: require.resolve('./stubs/outputs/withoutOptions.txt')
}

describe('[vue-sprited-svg-loader]: loader', () => {
    test('should compile without options', async () => {
        const stats = await compiler('icon-3.svg');
        const output = stats.toJson().modules[0].source;
        const outputStub = await readFile(outputStubs.withoutOptions);
        expect(output.replace(/\s/g, '')).toBe(outputStub.replace(/\s/g, ''));
    });

    test('should compile with class name "icon"', async () => {
        const stats = await compiler('icon-3.svg', {
            customClass: 'icon'
        });
        const output = stats.toJson().modules[0].source;
        const outputStub = await readFile(outputStubs.withClass);
        expect(output.replace(/\s/g, '')).toBe(outputStub.replace(/\s/g, ''));
    });

    test('should compile with styles', async () => {
        const stats = await compiler('icon-3.svg', {
            withStyle: true
        });
        const output = stats.toJson().modules[0].source;
        const outputStub = await readFile(outputStubs.withStyle);
        expect(output.replace(/\s/g, '')).toBe(outputStub.replace(/\s/g, ''));
    });

    test('should compile with styles and class', async () => {
        const stats = await compiler('icon-3.svg', {
            withStyle: true,
            customClass: 'icon'
        });
        const output = stats.toJson().modules[0].source;
        const outputStub = await readFile(outputStubs.withStyleAndClass);
        expect(output.replace(/\s/g, '')).toBe(outputStub.replace(/\s/g, ''));
    });
});
