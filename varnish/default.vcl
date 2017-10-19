vcl 4.0;

backend react {
  .host = "react";
  .port = "3000";
}

backend wordpress {
  .host = "wordpress";
  .port = "80";
}

sub vcl_recv {
  if (
    req.url ~ "^/graphql" ||
    req.url ~ "^/wp-" ||
    req.url ~ "^/feed" ||
    req.url ~ "^/sitemap" ||
    req.url ~ "sitemap.xml" ||
    req.url ~ "^/xmlrpc.php"
  ) {
    set req.backend_hint = wordpress;
  } else {
    set req.backend_hint = react;
  }

  # allows HMR in dev environments
  if (req.http.Accept ~ "text/event-stream") {
    return (pipe);
  }
}

sub vcl_deliver {
  unset resp.http.Via;
  unset resp.http.X-Varnish;
}

sub vcl_backend_response {
  set beresp.do_gzip = true;
}
