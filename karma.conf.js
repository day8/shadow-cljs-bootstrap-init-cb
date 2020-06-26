module.exports = function (config) {
    var root = './target/karma' // same as :output-dir
    var junitOutputDir = "target/karma/junit"
    var browsers = ['ChromeHeadless']

    config.set({
        frameworks: ['cljs-test'],
        browsers: browsers,
        basePath: root,
        files: [
            'test.js',
            {
                /* This makes bootstrap cache analysis files required by the self-hosted
                 * compiler available via the Karma web server (`served: true`) BUT does
                 * NOT inject those files into the web-page (`included: false`) as the
                 * self-hosted Clojure initialization will load these files. */
                pattern: 'bootstrap/**/*.*',
                watched: true,
                included: false,
                served: true,
                nocache: true
            }
        ],
        proxies: {
            "/bootstrap/": "http://localhost:9876/base/bootstrap/"
        },
        plugins: [
            'karma-cljs-test',
            'karma-chrome-launcher',
            'karma-junit-reporter'
        ],
        colors: true,
        logLevel: config.LOG_INFO,
        client: {
            args: ['shadow.test.karma.init'],
            singleRun: true,
            useIframe: false
            //runInParent: true
        },

        concurrency: 1,

        // the default configuration
        junitReporter: {
            outputDir: junitOutputDir, // results will be saved as outputDir/browserName.xml
            outputFile: undefined, // if included, results will be saved as outputDir/browserName/outputFile
            suite: '' // suite will become the package name attribute in xml testsuite element
        }
    })
}
