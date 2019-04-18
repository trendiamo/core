define(() =>
  (function(f, r, e, k, k, l, s) {
    return (f.onload = function() {
      var s1 = r.createElement("script"),
        s2 = r.getElementsByTagName("script")[0];
      s1.src = "//plugiamo.s3.eu-central-1.amazonaws.com/plugin.js";
      s1.charset = "utf-8";
      s2.parentNode.insertBefore(s1, s2);
    });
  })(window, document));
