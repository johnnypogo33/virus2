let numUsers = 0;

/**
 * Singleton representing the whole application.
 *
 * This is not meant to be edited unless if you want to fiddle with the core
 * functionality such as which configuration module to use (see
 * configModuleName()).
 *
 * For regular usage, you can modify ./app/config/versioned.yml and
 * ./app/config/unversioned.yml which will tell the app which components
 * (modules) to load.
 *
 * Each component can then have dependencies, an async init() method and a non-
 * async run() method, which are called automatically in the right order.
 */
class App {

  /**
   * Get the configuration module name to use.
   *
   * The configuration module is responsible for loading configuration,
   * normally from ./app/config/versioned.yml and ./app/config/unversioned.yml.
   *
   * If you want to do anything funky, you can modify the config to use here.
   */
  configModuleName() {
    return './config/index.js';
  }

  class(identifier) {
    const parts = identifier.split('/');
    const componentName = parts.shift();
    const rest = parts.join();
    return this.component('./' + componentName + '/src/' + rest + '.js');
  }

  /**
   * Get the components we want. Depedencies and order will be managed later.
   *
   * The components should be in the form of an object, where keys, such
   * as './staticPath/index.js', represent components, and values, such as
   * {}, or { paths: ['/usr/src/app/static'] }, represent configuration to pass
   * to those components.
   *
   * The components do not include dependencies. For that, call
   * componentsWithDependencies().
   *
   * componentsWithDependencies() will return required components including
   * dependencies in the order in which they need to be loaded, and will not
   * include configuration values.
   *
   * Therefore if you need to pass configuration values to a dependency of a
   * a module, you might want to consider adding the dependency to the module
   * list in ./app/config/versioned.yml or ./app/config/unversioned.yml.
   */
  components() /*:: : Object */ {
    // https://stackoverflow.com/a/1535650/1207752
    // https://github.com/facebook/flow/issues/8689
    // @ts-expect-error
    if (typeof this.components.ret == 'undefined') {
      // https://stackoverflow.com/a/1535650/1207752
      // https://github.com/facebook/flow/issues/8689
      // @ts-expect-error
      this.components.ret = Object.keys(this.config().modules);
    }
    // https://stackoverflow.com/a/1535650/1207752
    // https://github.com/facebook/flow/issues/8689
    // @ts-expect-error
    return this.components.ret;
  }

  /**
   * Get all components, with dependencies, in the order we want to load them.
   *
   * This will return an array of all components that need to be loaded,
   * including dependencies, but without configuration.
   *
   * If you need a component's configuration options (for example
   * './staticPath/index.js' might define _where_ its static files are located),
   * then use the components() method.
   */
  componentsWithDependencies() /*:: : Array<string> */ {
    // https://stackoverflow.com/a/1535650/1207752
    // https://github.com/facebook/flow/issues/8689
    // @ts-expect-error
    if (typeof this.componentsWithDependencies.ret == 'undefined') {
      // It has not... perform the initialization

      const components = this.component('./dependencies/index.js')
        .getInOrder(this.components(), this);
      if (components.errors.length) {
        console.log('Errors occurred during initialization phase:');
        console.log(components.errors);
        throw 'Errors occurred while fetching dependencies. One possibility is that your ./app/config/unversioned.yml uses an outdated format. See console.';
      }
      // https://stackoverflow.com/a/1535650/1207752
      // https://github.com/facebook/flow/issues/8689
      // @ts-expect-error
      this.componentsWithDependencies.ret = components.results;
    }
    // https://stackoverflow.com/a/1535650/1207752
    // https://github.com/facebook/flow/issues/8689
    // @ts-expect-error
    return this.componentsWithDependencies.ret;
  }

  /**
   * Mockable wrapper around require().
   */
  component(
    component /*:: : string */
  ) {
    return require(component);
  }

  c(component) {
    return this.component('./' + component + '/index.js');
  }

  /**
   * Get the site configuration from ./app/config/*.
   *
   * This will be a combination of ./app/config/versioned.yml and
   * ./app/config/unversioned.yml (unless you change the return value of
   * configModuleName()).
   */
  config()  /*:: : Object */ {
    // https://github.com/facebook/flow/issues/8689
    // @ts-expect-error
    if (typeof this.config.ret == 'undefined') {
      // https://github.com/facebook/flow/issues/8689
      // @ts-expect-error
      this.config.ret = this.component(this.configModuleName()).config();
    }
    // https://github.com/facebook/flow/issues/8689
    // @ts-expect-error
    return this.config.ret;
  }

  /**
   * Init the application and all its dependencies.
   *
   * This is done in two phases: the bootstrap, which is core functionality
   * for loading YML configuration from ./app/config/*; then, to initialize
   * the actual application functionality.
   */
  async init() {
    console.log('Init step starting...');
    await this.initBootstrap();
    await this.initModules();
    console.log('...init step complete.');
  }

  /**
   * Bootstrap the application, required before loading modules.
   */
  async initBootstrap() {
    await this.component(this.configModuleName()).init(this);
  }

  /**
   * Load all modules and their dependencies.
   */
  async initModules() {
    const that = this;

    await this.eachComponentAsync(async function(component) {
      if (typeof that.component(component).init === 'function') {
        console.log('[x] ' + component + ' has an init() function; calling it.');
        await that.component(component).init(that);
      }
      else {
        console.log('[ ] ' + component + ' has no init() function; moving on.');
      }
    });
  }

  async eachComponentAsync(actionCallback) {
    for (const component of this.componentsWithDependencies()) {
      await actionCallback(component);
    }
  }

  eachComponent(actionCallback) {
    for (const component of this.componentsWithDependencies()) {
      actionCallback(component);
    }
  }

  /**
   * Exit gracefully after allowing dependencies to exit gracefully.
   */
  async exitGracefully() {
    await this.component('./database/index.js').exitGracefully();
    // @ts-expect-error
    process.exit(0);
  }

  /**
   * See the "Plugins" section in ./README.md.
   */
  invokePlugin(componentName, pluginName, callback) {
    // See https://www.geeksforgeeks.org/how-to-execute-multiple-promises-sequentially-in-javascript/.
    let result = {};
    const that = this;
    let promises = [];
    for (const component of this.componentsWithDependencies()) {
      if (typeof that.component(component).invokePlugin === 'function') {
        that.component(component).invokePlugin(componentName, pluginName, (result) => {
          // Functions declared within loops referencing an outer scoped variable
          // may lead to confusing semantics. (callback). This may be true, but
          // I'm not sure how to do this otherwise: every single plugin is given
          // the chance to call the callback.
          /* jshint ignore:start */
          callback(component, result);
          /* jshint ignore:end */
        });
      }
    }
  }

  /**
   * Run the application.
   */
  run() {
    console.log('Run step starting...');

    const that = this;

    this.eachComponent(async function(component) {
      if (typeof that.component(component).run === 'function') {
        console.log('[x] ' + component + ' has a run() function; calling it.');
        that.component(component).run(that);
      }
      else {
        console.log('[ ] ' + component + ' has no run() function; moving on.');
      }
    });

    console.log('...run step complete.');
  }
}

module.exports = new App();
