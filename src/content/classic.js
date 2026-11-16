(() => {
  const FLAGS = new Set(['WebFEAllStudioByChannel__enable_analytics_hub_web', 'WebFEAllStudioByChannel__enable_content_hub_web']);

  const flip = (o) => {
    if (o && typeof o === 'object') {
      for (const k in o) {
        if (FLAGS.has(k) && o[k] === true) {
          o[k] = false;
        } else flip(o[k]);
      }
    }
    return o;
  };

  const wrapYtcfg = (cfg) => {
    cfg.__wrapped = true;

    if (typeof cfg.set === 'function') {
      const originalSet = cfg.set.bind(cfg);
      cfg.set = function (data) {
        flip(data);
        return originalSet(data);
      };
    }
    return cfg;
  };

  let _ytcfg;
  Object.defineProperty(window, 'ytcfg', {
    configurable: true,
    get() { return _ytcfg; },
    set(v) { _ytcfg = wrapYtcfg(v); }
  });
})();
