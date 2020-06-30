class Router {
  constructor(routes) {
    this.routes = routes;
    this.listen(this.routes);
  }

  listen = (routes) => {
    let app = document.getElementById('app');
    let currentPath = document.location.pathname;
    let navbar = document.getElementById('navbar').shadowRoot;
    let activeRoutes = Array.from(navbar.querySelectorAll('[route]'));

    activeRoutes.forEach((route) => {
      route.addEventListener('click', this.navigate);
    });

    let route = routes.filter((r) => {
      let isMatch = r.path === currentPath;
      if (isMatch) {
        return isMatch;
      }
      return r.path === '/error';
    })[0];
    window.history.pushState({ navigate: `${route.path}` }, 'name', route.path);
    app.innerHTML = route.view();
  };

  navigate = (event) => {
    let targetRoute = event.path[0].attributes[1].value;
    let route = this.routes.filter((r) => {
      let isMatch = r.path === targetRoute;
      if (isMatch) {
        return isMatch;
      }
      return r.path === '/error';
    })[0];

    window.history.pushState({ navigate: `${route.path}` }, 'name', route.path);
    app.innerHTML = route.view();
  };
}

export default Router;

// let navbar = document.getElementById('navbar').shadowRoot;
// let listEl = Array.from(navbar.querySelectorAll('.nav-link'));
// listEl.forEach((el) => {
//   el.addEventListener('click', (event) => {
//     let path = event.target.attributes[0].value;
//     console.log(path);
//   });
// });

// class Router {
//   routes = [];

//   mode = null;

//   root = '/';

//   constructor(options) {
//     this.mode = window.history.pushState ? 'history' : 'hash';
//     if (options.mode) this.mode = options.mode;
//     if (options.root) this.root = options.root;

//     this.listen();
//   }

//   add = (path, cb) => {
//     this.routes.push({ path, cb });
//     return this;
//   };

//   remove = (path) => {
//     for (let i = 0; i < this.routes.length; i += 1) {
//       if (this.routes[i].path === path) {
//         this.routes.slice(i, 1);
//         return this;
//       }
//     }
//     return this;
//   };

//   flush = () => {
//     this.routes = [];
//     return this;
//   };

//   listen = () => {
//     clearInterval(this.interval);
//     this.interval = setInterval(this.interval, 50);
//   };

//   interval = () => {
//     if (this.current === this.getFragment()) return;
//     this.current = this.getFragment();

//     this.routes.some((route) => {
//       const match = this.current.match(route.path);
//       if (match) {
//         match.shift();
//         route.cb.apply({}, match);
//         return match;
//       }
//       return false;
//     });
//   };

//   getFragment = () => {
//     let fragment = '';
//     if (this.mode === 'history') {
//       fragment = this.clearSlashes(
//         decodeURI(window.location.pathname + window.location.search)
//       );
//       fragment = fragment.replace(/\?(.*)$/, '');
//       fragment = this.root !== '/' ? fragment.replace(this.root, '') : fragment;
//     } else {
//       const match = window.location.href.match(/#(.*)$/);
//       fragment = match ? match[1] : '';
//     }
//   };

//   clearSlashes = (path) => {
//     path.toString().replace(/\/$/, '').replace(/^\//, '');
//   };

//   navigate = (path = '') => {
//     if (this.mode === 'history') {
//       window.history.pushState(null, null, this.root + this.clearSlashes(path));
//     } else {
//       window.location.href = `${window.location.href.replace(
//         /#(.*)$/,
//         ''
//       )}#${path}`;
//     }
//     return this;
//   };
// }

// export default Router;

// class Router {
// constructor(routes = [], renderNode) {
//   this.routes = routes;
//   this.renderNode = renderNode;
//   this.navigate(location.pathname + location.hash);
// }

// match(route, requestPath) {
//   let paramNames = [];

//   // create a regular expression of the route
//   let regexPath = route.path;
//   // .replace(/([:*])(\w+)/g, (name) => {
//   //   console.log(name);
//   //   paramNames.push(name);
//   //   return '([^/]+)';
//   // });
//   // console.log(route.path);

//   paramNames.push(route.name);

//   let params = {};
//   // match the requested path with the regular expression
//   let routeMatch = requestPath.match(new RegExp(regexPath));
//   console.log(routeMatch);

//   if (routeMatch !== null) {
//     params = routeMatch.slice(1).reduce((params, value, index) => {
//       if (params === null) {
//         params = {};
//       }
//       params[paramNames[index]] = value;
//       return params;
//     }, null);
//   }

//   // Set the props of the route
//   route.setProps(params);

//   return routeMatch;
// }

// navigate(path) {
//   const route = this.routes.filter((route) => this.match(route, path))[0];

//   if (!route) {
//     this.renderNode.innerHtml = '401! Page not found';
//   } else {
//     window.location.href = path.search('/#') === -1 ? '#' + path : path;
//     // innerHtml must be avoided
//     this.renderNode.innerHtml = route.renderView();
//   }
// }

// addRoutes(routes) {
//   this.routes = [...this.routes, ...routes];
// }
// }

// export default Router;
