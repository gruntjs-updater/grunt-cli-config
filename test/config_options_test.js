'use strict';

var grunt = require('grunt'),
    configOptions = require(__dirname + '/../index')(grunt),
    originalFlags;

//normally we would load the plugin with .grunt.loadNpmTasks('grunt-cli-config');
//but we load it this way here so we can have access to the normalize and parse methods

exports.config_options = {
    setUp: function setUp(done) {
        originalFlags = grunt.option.flags();
        done();
    },
    tearDown: function tearDown(done) {
        grunt.option.init(originalFlags);
        done();
    },
    normalize: function normalizeTest(test) {
        var expected = 'foo',
            actual = configOptions.normalize('--no-foo');

        test.strictEqual(actual, expected, 'Normalizing param');
        test.done();
    },
    parse: function parseTest(test) {
        var expected,
            actual;

        expected = {
            key: 'foo',
            value: 'bar'
        };

        actual = configOptions.parse('foo=bar');

        test.deepEqual(actual, expected, 'Verifying parsing');
        test.done();
    },
    any: function anyTest(test) {
        var expected = 'param',
            actual;

        grunt.option.init({
            any : 'param'
        });

        grunt.applyCliConfig();
        actual = grunt.config('any');
        test.strictEqual(actual, expected, 'Verifying --any=param');
        test.done();
    },
    boolean: function booleanTest(test) {
        var expected = true,
            actual;

        grunt.option.init({
            other : true
        });

        grunt.applyCliConfig();
        actual = grunt.config('other');
        test.strictEqual(actual, expected, 'Verifying --other');
        test.done();
    },
    negative: function negativeTest(test) {
        var expected = false,
            actual;

        //setting the flags to [ '--no-crop' ]
        grunt.option.init({
            crop: false
        });

        grunt.applyCliConfig();
        actual = grunt.config('crop');
        test.strictEqual(actual, expected, 'Verifying negative boolean');
        test.done();
    }
};
